// Method 1
function encrypt(text: string, key: string): string {
  // Ensure text and key are uppercase
  text = text.toUpperCase();
  key = key.toUpperCase();

  // Initializing cipherText
  let cipherText = "";
  let keyIndex = 0;

  // Encrypting
  for (let i = 0; i < text.length; i++) {
    if (text[i] === " ") {
      cipherText += " ";
    } else {
      let charCode =
        text.charCodeAt(i) -
        "A".charCodeAt(0) +
        key.charCodeAt(keyIndex) -
        "A".charCodeAt(0);
      if (charCode > 25) charCode -= 26;
      cipherText += String.fromCharCode(charCode + "A".charCodeAt(0));
      keyIndex = (keyIndex + 1) % key.length;
    }
  }
  return cipherText;
}

// Method 2
function decrypt(s: string, key: string): string {
  // Ensure s and key are uppercase
  s = s.toUpperCase();
  key = key.toUpperCase();

  // Initializing plainText
  let plainText = "";
  let keyIndex = 0;

  // Decrypting
  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") {
      plainText += " ";
    } else {
      let charCode =
        s.charCodeAt(i) -
        "A".charCodeAt(0) -
        (key.charCodeAt(keyIndex) - "A".charCodeAt(0));
      if (charCode < 0) charCode += 26;
      plainText += String.fromCharCode(charCode + "A".charCodeAt(0));
      keyIndex = (keyIndex + 1) % key.length;
    }
  }
  return plainText;
}

// Constraint : Key length same as the input length (without space)
export const oneTimePadAlgorithm = { encrypt, decrypt };
