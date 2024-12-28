function generateKey(str: string, keyAsStr: string): string {
  const key = keyAsStr.split("");
  if (str.length === key.length) return key.join("");
  else {
    const temp = key.length;
    for (let i = 0; i < str.length - temp; i++) {
      key.push(key[i % key.length]);
    }
  }
  return key.join("");
}

// This function returns the encrypted text
// generated with the help of the key
function cipherText(str: string, key: string): string {
  let cipher_text = "";

  for (let i = 0; i < str.length; i++) {
    // converting in range 0-25
    let x = (str[i].charCodeAt(0) + key[i].charCodeAt(0)) % 26;

    // convert into alphabets(ASCII)
    x += "A".charCodeAt(0);

    cipher_text += String.fromCharCode(x);
  }
  return cipher_text;
}

// This function decrypts the encrypted text
// and returns the original text
function originalText(cipher_text: string, key: string): string {
  let orig_text = "";

  for (let i = 0; i < cipher_text.length; i++) {
    // converting in range 0-25
    let x = (cipher_text[i].charCodeAt(0) - key[i].charCodeAt(0) + 26) % 26;

    // convert into alphabets(ASCII)
    x += "A".charCodeAt(0);
    orig_text += String.fromCharCode(x);
  }
  return orig_text;
}

// This function will convert the lower
// case character to Upper case
function LowerToUpper(s: string): string {
  let str = s.split("");
  for (let i = 0; i < s.length; i++) {
    if (s[i] === s[i].toLowerCase()) {
      str[i] = s[i].toUpperCase();
    }
  }
  return str.join("");
}

// Driver code
const str: string = "ahmed";
const keyword: string = "deceptivedeceptivedeceptive";

const encrypt = (input: string, key: string): string => {
  const upperCaseInp = input.toUpperCase();
  const upperCaseKey = key.toUpperCase();
  const generatedKey = generateKey(upperCaseInp, upperCaseKey);
  const enc = cipherText(upperCaseInp, generatedKey);
  return enc;
};

const decrypt = (input: string, key: string): string => {
  const upperCaseInp = input.toUpperCase();
  const upperCaseKey = key.toUpperCase();
  const generatedKey = generateKey(upperCaseInp, upperCaseKey);
  const dec = originalText(input, generatedKey);
  return dec;
};

export const polyalphabeticAlgorithm = {
  encrypt,
  decrypt,
};
