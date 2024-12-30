// Method 1
// Returning encrypted text
function encrypt(text: string, key: string): string {
  // Initializing cipherText
  let cipherText = "";
  let keyIndex = 0;

  // Encrypting
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    let isUpperCase = char === char.toUpperCase();

    if (char === " ") {
      cipherText += " ";
    } else {
      // Adjust for uppercase or lowercase
      let base = isUpperCase ? "A".charCodeAt(0) : "a".charCodeAt(0);
      let keyBase =
        key[keyIndex].toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
      let charCode = (char.charCodeAt(0) - base + keyBase) % 26;

      cipherText += String.fromCharCode(charCode + base);
      keyIndex = (keyIndex + 1) % key.length; // Loop key
    }
  }
  return cipherText;
}

// Method 2
// Returning plain text
function decrypt(text: string, key: string): string {
  // Initializing plainText
  let plainText = "";
  let keyIndex = 0;

  // Decrypting
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    let isUpperCase = char === char.toUpperCase();

    if (char === " ") {
      plainText += " ";
    } else {
      // Adjust for uppercase or lowercase
      let base = isUpperCase ? "A".charCodeAt(0) : "a".charCodeAt(0);
      let keyBase =
        key[keyIndex].toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
      let charCode = (char.charCodeAt(0) - base - keyBase + 26) % 26;

      plainText += String.fromCharCode(charCode + base);
      keyIndex = (keyIndex + 1) % key.length; // Loop key
    }
  }
  return plainText;
}

// Constraint : Key length same as the input length (without space)
export const oneTimePadAlgorithm = { encrypt, decrypt };
