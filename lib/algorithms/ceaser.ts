// Function to encrypt text using Caesar Cipher
function encrypt(text: string, s: string): string {
  let result = "";
  const key = Number.parseInt(s);

  for (let i = 0; i < text.length; i++) {
    let char = text[i];

    // Check if character is uppercase
    if (char >= "A" && char <= "Z") {
      let ch = String.fromCharCode(((char.charCodeAt(0) - 65 + key) % 26) + 65);
      result += ch;
    }
    // Check if character is lowercase
    else if (char >= "a" && char <= "z") {
      let ch = String.fromCharCode(((char.charCodeAt(0) - 97 + key) % 26) + 97);
      result += ch;
    }
    // If it's not a letter, keep it as is
    else {
      result += char;
    }
  }
  return result;
}

// Function to decrypt text using Caesar Cipher
function decrypt(text: string, s: string): string {
  const key = 26 - (+s % 26);
  return encrypt(text, `${key}`); // Decrypt by reversing the shift
}

export const CeaserAlgorithm = {
  encrypt,
  decrypt,
};
