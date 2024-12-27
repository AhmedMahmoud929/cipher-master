// Define types for encryption and decryption maps
type CipherMaps = {
  encryptionMap: Record<string, string>;
  decryptionMap: Record<string, string>;
};

// Generate the encryption and decryption maps
function generateCipherMaps(key: string): CipherMaps {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const finalKey = key.toUpperCase();
  const encryptionMap: Record<string, string> = {};
  const decryptionMap: Record<string, string> = {};

  // Add unique characters from the key
  for (const char of finalKey) {
    if (
      alphabet.includes(char) &&
      !Object.values(encryptionMap).includes(char)
    ) {
      encryptionMap[alphabet[Object.keys(encryptionMap).length]] = char;
    }
  }

  // Add remaining alphabet characters
  for (const char of alphabet) {
    if (!Object.values(encryptionMap).includes(char)) {
      encryptionMap[alphabet[Object.keys(encryptionMap).length]] = char;
    }
  }

  // Create decryption map
  for (const [plain, cipher] of Object.entries(encryptionMap)) {
    decryptionMap[cipher] = plain;
  }

  return { encryptionMap, decryptionMap };
}

// Encryption function
function encrypt(plaintext: string, key: string): string {
  const { encryptionMap } = generateCipherMaps(key);
  const upperPlaintext = plaintext.toUpperCase();
  let encryptedText = "";

  for (const char of upperPlaintext) {
    if (encryptionMap.hasOwnProperty(char)) {
      encryptedText += encryptionMap[char];
    } else {
      encryptedText += char; // Keep non-alphabetic characters unchanged
    }
  }

  return encryptedText;
}

// Decryption function
function decrypt(ciphertext: string, key: string): string {
  const { decryptionMap } = generateCipherMaps(key);
  const upperCiphertext = ciphertext.toUpperCase();
  let decryptedText = "";

  for (const char of upperCiphertext) {
    if (decryptionMap.hasOwnProperty(char)) {
      decryptedText += decryptionMap[char];
    } else {
      decryptedText += char; // Keep non-alphabetic characters unchanged
    }
  }

  return decryptedText;
}

export const monoalphabeticAlgorithm = {
  encrypt,
  decrypt,
};
