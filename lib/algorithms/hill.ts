// Utility functions
function textToNumbers(text: string): number[] {
  return text
    .toUpperCase()
    .replace(/[^A-Z]/g, "") // Remove non-alphabetic characters
    .split("")
    .map((char) => char.charCodeAt(0) - 65);
}

function numbersToText(numbers: number[]): string {
  return numbers.map((num) => String.fromCharCode(num + 65)).join("");
}

function mod26(num: number): number {
  return ((num % 26) + 26) % 26;
}

function modInverse(a: number, m: number): number {
  a = a % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  throw new Error("No modular inverse exists");
}

function applyPadding(plain: number[], blockSize: number): number[] {
  const remainder = plain.length % blockSize;
  if (remainder !== 0) {
    const paddingLength = blockSize - remainder;
    for (let i = 0; i < paddingLength; i++) {
      plain.push(23); // Padding character "X" = 23
    }
  }
  return plain;
}

function multiplyMatrix(
  block: number[],
  key: number[],
  blockSize: number
): number[] {
  const result: number[] = [];
  for (let i = 0; i < blockSize; i++) {
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum += block[j] * key[i * blockSize + j];
    }
    result.push(mod26(sum));
  }
  return result;
}

function findInverseKey(key: number[], blockSize: number): number[] {
  let determinant = 0;

  if (blockSize === 2) {
    determinant = key[0] * key[3] - key[1] * key[2];
  } else if (blockSize === 3) {
    determinant =
      key[0] * (key[4] * key[8] - key[5] * key[7]) -
      key[1] * (key[3] * key[8] - key[5] * key[6]) +
      key[2] * (key[3] * key[7] - key[4] * key[6]);
  } else {
    throw new Error("Only 2x2 or 3x3 keys are supported");
  }

  if (determinant === 0) {
    throw new Error("Key matrix is not invertible");
  }

  const inverseDeterminant = modInverse(determinant, 26);
  let inverseKey: number[] = [];

  if (blockSize === 2) {
    inverseKey = [
      mod26(inverseDeterminant * key[3]),
      mod26(-inverseDeterminant * key[1]),
      mod26(-inverseDeterminant * key[2]),
      mod26(inverseDeterminant * key[0]),
    ];
  } else if (blockSize === 3) {
    const adjugate = [
      mod26(key[4] * key[8] - key[5] * key[7]),
      mod26(-(key[1] * key[8] - key[2] * key[7])),
      mod26(key[1] * key[5] - key[2] * key[4]),
      mod26(-(key[3] * key[8] - key[5] * key[6])),
      mod26(key[0] * key[8] - key[2] * key[6]),
      mod26(-(key[0] * key[5] - key[2] * key[3])),
      mod26(key[3] * key[7] - key[4] * key[6]),
      mod26(-(key[0] * key[7] - key[1] * key[6])),
      mod26(key[0] * key[4] - key[1] * key[3]),
    ];

    inverseKey = adjugate.map((value) => mod26(value * inverseDeterminant));
  }

  return inverseKey;
}

// Encryption function
function encrypt(plain: string, key: string): string {
  const keyArray = key.split("").map(Number);
  const blockSize = Math.sqrt(keyArray.length);
  if (!Number.isInteger(blockSize)) {
    throw new Error("Key length must be a perfect square");
  }

  let plainNumbers = textToNumbers(plain);
  plainNumbers = applyPadding(plainNumbers, blockSize);

  const cipher: number[] = [];
  for (let i = 0; i < plainNumbers.length; i += blockSize) {
    const block = plainNumbers.slice(i, i + blockSize);
    const cipherBlock = multiplyMatrix(block, keyArray, blockSize);
    cipher.push(...cipherBlock);
  }

  return numbersToText(cipher);
}

// Decryption function
function decrypt(cipher: string, key: string): string {
  const keyArray = key.split("").map(Number);
  const blockSize = Math.sqrt(keyArray.length);
  if (!Number.isInteger(blockSize)) {
    throw new Error("Key length must be a perfect square");
  }

  const inverseKey = findInverseKey(keyArray, blockSize);
  const cipherNumbers = textToNumbers(cipher);

  const plain: number[] = [];
  for (let i = 0; i < cipherNumbers.length; i += blockSize) {
    const block = cipherNumbers.slice(i, i + blockSize);
    const plainBlock = multiplyMatrix(block, inverseKey, blockSize);
    plain.push(...plainBlock);
  }

  return numbersToText(plain).replace(/X+$/, ""); // Remove padding characters
}

// Exporting functions
export const hillAlgorithm = {
  encrypt,
  decrypt,
};
