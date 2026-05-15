function rightRotate(value: number, amount: number) {
  return (value >>> amount) | (value << (32 - amount));
}

export function normalizeContactPhoneNumber(value: string): string {
  return value.trim().replace(/[\s()-]/g, '');
}

export async function hashContactPhoneNumber(value: string): Promise<string> {
  return sha256(normalizeContactPhoneNumber(value));
}

function sha256(ascii: string): string {
  const maxWord = Math.pow(2, 32);
  const words: number[] = [];
  const hash: number[] = [];
  const roundConstants: number[] = [];
  const compositeMap: Record<number, boolean> = {};
  const asciiBitLength = ascii.length * 8;

  let primeCounter = 0;
  for (let candidate = 2; primeCounter < 64; candidate += 1) {
    if (compositeMap[candidate]) {
      continue;
    }

    for (let multiple = candidate; multiple < 313; multiple += candidate) {
      compositeMap[multiple] = true;
    }

    hash[primeCounter] = (Math.pow(candidate, 0.5) * maxWord) | 0;
    roundConstants[primeCounter] = (Math.pow(candidate, 1 / 3) * maxWord) | 0;
    primeCounter += 1;
  }

  let paddedAscii = `${ascii}\x80`;
  while ((paddedAscii.length % 64) !== 56) {
    paddedAscii += '\x00';
  }

  for (let index = 0; index < paddedAscii.length; index += 1) {
    const charCode = paddedAscii.charCodeAt(index);
    words[index >> 2] = (words[index >> 2] ?? 0) | (charCode << ((3 - (index % 4)) * 8));
  }

  words.push((asciiBitLength / maxWord) | 0);
  words.push(asciiBitLength);

  for (let chunkOffset = 0; chunkOffset < words.length; chunkOffset += 16) {
    const chunk = words.slice(chunkOffset, chunkOffset + 16);
    const workingHash = hash.slice(0);

    for (let index = 0; index < 64; index += 1) {
      if (index >= 16) {
        const word15 = chunk[index - 15] ?? 0;
        const word2 = chunk[index - 2] ?? 0;
        const sigma0 = rightRotate(word15, 7) ^ rightRotate(word15, 18) ^ (word15 >>> 3);
        const sigma1 = rightRotate(word2, 17) ^ rightRotate(word2, 19) ^ (word2 >>> 10);
        chunk[index] = (((chunk[index - 16] ?? 0) + sigma0 + (chunk[index - 7] ?? 0) + sigma1) | 0);
      }

      const a = workingHash[0] ?? 0;
      const b = workingHash[1] ?? 0;
      const c = workingHash[2] ?? 0;
      const d = workingHash[3] ?? 0;
      const e = workingHash[4] ?? 0;
      const f = workingHash[5] ?? 0;
      const g = workingHash[6] ?? 0;
      const h = workingHash[7] ?? 0;

      const sum1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const choice = (e & f) ^ (~e & g);
      const temp1 = (h + sum1 + choice + (roundConstants[index] ?? 0) + (chunk[index] ?? 0)) | 0;
      const sum0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const majority = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (sum0 + majority) | 0;

      workingHash[7] = g;
      workingHash[6] = f;
      workingHash[5] = e;
      workingHash[4] = (d + temp1) | 0;
      workingHash[3] = c;
      workingHash[2] = b;
      workingHash[1] = a;
      workingHash[0] = (temp1 + temp2) | 0;
    }

    for (let index = 0; index < 8; index += 1) {
      hash[index] = ((hash[index] ?? 0) + (workingHash[index] ?? 0)) | 0;
    }
  }

  let result = '';
  for (let index = 0; index < 8; index += 1) {
    const value = hash[index] ?? 0;
    for (let byteIndex = 3; byteIndex >= 0; byteIndex -= 1) {
      const byte = (value >> (byteIndex * 8)) & 255;
      result += byte.toString(16).padStart(2, '0');
    }
  }

  return result;
}
