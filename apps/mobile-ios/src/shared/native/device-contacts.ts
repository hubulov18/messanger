import Contacts from 'react-native-contacts';
import type { Contact } from 'react-native-contacts';

export type DeviceContactPhone = {
  label: string | null;
  value: string;
};

export type DeviceContact = {
  id: string;
  displayName: string;
  phoneNumbers: DeviceContactPhone[];
};

export type DeviceContactsApi = {
  list(): Promise<DeviceContact[]>;
};

function buildDisplayName(contact: Contact) {
  const givenName = contact.givenName?.trim() ?? '';
  const familyName = contact.familyName?.trim() ?? '';
  const composedName = [givenName, familyName].filter(Boolean).join(' ').trim();

  if (composedName.length > 0) {
    return composedName;
  }

  const displayName = contact.displayName?.trim() ?? '';
  if (displayName.length > 0) {
    return displayName;
  }

  return 'Unknown Contact';
}

export const deviceContactsApi: DeviceContactsApi = {
  async list() {
    // Prefer getAll; fall back to getAllWithoutPhotos (skips photo fetch, faster).
    // Both come from the default export of react-native-contacts.
    const loadContacts: (() => Promise<Contact[]>) | null =
      typeof Contacts.getAll === 'function'
        ? () => Contacts.getAll()
        : typeof Contacts.getAllWithoutPhotos === 'function'
          ? () => Contacts.getAllWithoutPhotos()
          : null;

    if (!loadContacts) {
      throw new Error(
        'Device contacts module is not available. Rebuild the app after running pod install.',
      );
    }

    const contacts = await loadContacts();

    return contacts.map((contact) => ({
      id: contact.recordID,
      displayName: buildDisplayName(contact),
      phoneNumbers: (contact.phoneNumbers ?? [])
        .map((phoneNumber) => ({
          label: phoneNumber.label ?? null,
          value: phoneNumber.number?.trim() ?? '',
        }))
        .filter((phoneNumber) => phoneNumber.value.length > 0),
    }));
  },
};
