import { getContacts, importContacts } from '@features/contacts/api/contacts.api';
import { hashContactPhoneNumber, normalizeContactPhoneNumber } from '@shared/contacts/contact-hash';
import { deviceContactsApi, type DeviceContact } from '@shared/native/device-contacts';
import {
  contactsPermissionsApi,
  type DeviceContactsPermissionStatus,
} from '@shared/native/contacts-permissions';

export type ManualImportInput = {
  phoneNumber: string;
  displayName: string;
};

export type ContactsImportResult = {
  importedCount: number;
  matchedCount: number;
};

export type ContactsPermissionErrorReason =
  | 'permission_unknown'
  | 'permission_denied'
  | 'permission_blocked';

export class ContactsPermissionError extends Error {
  constructor(public readonly reason: ContactsPermissionErrorReason) {
    super(getContactsPermissionErrorMessage(reason));
    this.name = 'ContactsPermissionError';
  }
}

const CONTACTS_IMPORT_BATCH_SIZE = 250;

export async function importManualContact(input: ManualImportInput): Promise<ContactsImportResult> {
  const normalizedPhoneNumber = normalizeContactPhoneNumber(input.phoneNumber);
  const normalizedDisplayName = input.displayName.trim();

  if (!normalizedPhoneNumber || !normalizedDisplayName) {
    throw new Error('Phone number and display name are required');
  }

  const normalizedHash = await hashContactPhoneNumber(normalizedPhoneNumber);
  const result = await importContacts([
    {
      normalizedHash,
      phoneNumber: normalizedPhoneNumber,
      displayName: normalizedDisplayName,
    },
  ]);

  return {
    importedCount: 1,
    matchedCount: result.matchedCount,
  };
}

export async function importDeviceContacts(): Promise<ContactsImportResult> {
  const permissionStatus = await contactsPermissionsApi.getStatus();
  assertContactsPermissionGranted(permissionStatus);

  const deviceContacts = await deviceContactsApi.list();
  const flattenedContacts = flattenDeviceContacts(deviceContacts);

  if (flattenedContacts.length === 0) {
    return {
      importedCount: 0,
      matchedCount: 0,
    };
  }

  const deduplicatedContacts = await buildImportPayload(flattenedContacts);
  if (deduplicatedContacts.length === 0) {
    return {
      importedCount: 0,
      matchedCount: 0,
    };
  }

  let matchedCount = 0;

  for (let index = 0; index < deduplicatedContacts.length; index += CONTACTS_IMPORT_BATCH_SIZE) {
    const batch = deduplicatedContacts.slice(index, index + CONTACTS_IMPORT_BATCH_SIZE);
    const result = await importContacts(batch);
    matchedCount += result.matchedCount;
  }

  return {
    importedCount: deduplicatedContacts.length,
    matchedCount,
  };
}

export async function loadMatchedContacts() {
  const response = await getContacts();
  return response.items;
}

export async function getContactsPermissionStatus() {
  return contactsPermissionsApi.getStatus();
}

export async function requestContactsPermission() {
  return contactsPermissionsApi.request();
}

export async function openContactsSettings() {
  await contactsPermissionsApi.openSettings();
}

export function flattenDeviceContacts(contacts: DeviceContact[]) {
  return contacts.flatMap((contact) =>
    contact.phoneNumbers
      .map((phoneNumber) => ({
        displayName: contact.displayName.trim(),
        phoneNumber: phoneNumber.value,
      }))
      .filter((item) => item.displayName.length > 0 && item.phoneNumber.trim().length > 0),
  );
}

function assertContactsPermissionGranted(status: DeviceContactsPermissionStatus) {
  switch (status) {
    case 'granted':
      return;
    case 'unknown':
      throw new ContactsPermissionError('permission_unknown');
    case 'denied':
      throw new ContactsPermissionError('permission_denied');
    case 'blocked':
      throw new ContactsPermissionError('permission_blocked');
    default:
      throw new Error('Unexpected contacts permission status');
  }
}

function getContactsPermissionErrorMessage(reason: ContactsPermissionErrorReason) {
  switch (reason) {
    case 'permission_unknown':
      return 'Contacts permission has not been requested yet';
    case 'permission_denied':
      return 'Contacts permission was denied';
    case 'permission_blocked':
      return 'Contacts permission is blocked in system settings';
  }
}

async function buildImportPayload(
  contacts: Array<{
    displayName: string;
    phoneNumber: string;
  }>,
) {
  const deduplicatedContacts = new Map<
    string,
    {
      normalizedHash: string;
      phoneNumber: string;
      displayName: string;
    }
  >();

  for (const contact of contacts) {
    const normalizedPhoneNumber = normalizeContactPhoneNumber(contact.phoneNumber);
    const normalizedDisplayName = contact.displayName.trim();

    if (!normalizedPhoneNumber || !normalizedDisplayName) {
      continue;
    }

    const normalizedHash = await hashContactPhoneNumber(normalizedPhoneNumber);
    if (!deduplicatedContacts.has(normalizedHash)) {
      deduplicatedContacts.set(normalizedHash, {
        normalizedHash,
        phoneNumber: normalizedPhoneNumber,
        displayName: normalizedDisplayName,
      });
    }
  }

  return [...deduplicatedContacts.values()];
}
