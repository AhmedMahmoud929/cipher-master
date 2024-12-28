import React, { useState } from "react";

function textToNumbers(text: string): number[] {
  return text
    .toUpperCase()
    .split("")
    .map((char) => char.charCodeAt(0) - 65);
}

function numbersToText(numbers: number[]): string {
  return numbers.map((num) => String.fromCharCode(num + 65)).join("");
}

interface HillCipherInterface {
  key: number[];
  encrypt(plain: number[]): number[];
  decrypt(cipher: number[]): number[];
  setKey(key: number[]): void;
}

class HillCipher implements HillCipherInterface {
  key: number[];

  constructor() {
    this.key = [];
  }

  encrypt(plain: number[]): number[] {
    const key = this.key;
    plain = this.applyPadding(plain, key.length);
    let cipher: number[] = [];
    let blockSize = Math.sqrt(key.length);
    for (let i = 0; i < plain.length; i += blockSize) {
      let block = plain.slice(i, i + blockSize);
      let cipherBlock = this.multiplyMatrix(block, key, blockSize);
      cipher.push(...cipherBlock.map((num) => this.mod26(num)));
    }
    return cipher;
  }

  decrypt(cipher: number[]): number[] {
    const key = this.key;
    cipher = this.applyPadding(cipher, key.length);
    let plain: number[] = [];
    let blockSize = Math.sqrt(key.length);
    let inverseKey = this.findInverseKey(key, blockSize);
    if (!inverseKey) return [];
    for (let i = 0; i < cipher.length; i += blockSize) {
      let block = cipher.slice(i, i + blockSize);
      let plainBlock = this.multiplyMatrix(block, inverseKey, blockSize);
      plain.push(...plainBlock.map((num) => this.mod26(num)));
    }
    return plain;
  }

  private multiplyMatrix(
    block: number[],
    key: number[],
    blockSize: number
  ): number[] {
    let result: number[] = [];
    for (let i = 0; i < blockSize; i++) {
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum += block[j] * key[i + j * blockSize];
      }
      result.push(sum);
    }
    return result;
  }

  private findInverseKey(key: number[], blockSize: number): number[] | null {
    let determinant = 0;
    if (blockSize === 2) {
      determinant = key[0] * key[3] - key[1] * key[2];
    } else if (blockSize === 3) {
      determinant =
        key[0] * (key[4] * key[8] - key[5] * key[7]) -
        key[1] * (key[3] * key[8] - key[5] * key[6]) +
        key[2] * (key[3] * key[7] - key[4] * key[6]);
    }

    if (determinant === 0) {
      console.log("The key is invalid (determinant is 0).");
      return null;
    }

    let inverseDeterminant = this.modInverse(determinant, 26);
    let inverseKey: number[] = [];
    if (blockSize === 2) {
      inverseKey = [
        this.mod26(inverseDeterminant * key[3]),
        this.mod26(-inverseDeterminant * key[1]),
        this.mod26(-inverseDeterminant * key[2]),
        this.mod26(inverseDeterminant * key[0]),
      ];
    } else if (blockSize === 3) {
      // Inverse calculation for 3x3 matrix (not implemented here)
    }
    return inverseKey;
  }

  private modInverse(a: number, m: number): number {
    a = a % m;
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) return x;
    }
    return -1;
  }

  private mod26(num: number): number {
    return ((num % 26) + 26) % 26;
  }

  private applyPadding(plain: number[], keyLength: number): number[] {
    let blockSize = Math.sqrt(keyLength);
    let remainder = plain.length % blockSize;
    if (remainder !== 0) {
      let paddingLength = blockSize - remainder;
      for (let i = 0; i < paddingLength; i++) {
        plain.push(23);
      }
    }
    return plain;
  }

  removePadding(plain: number[]): number[] {
    while (plain[plain.length - 1] === 23) {
      plain.pop();
    }
    return plain;
  }

  setKey(key: number[]): void {
    this.key = key;
  }
}

function isInvertible(key: number[], blockSize: number): boolean {
  let determinant = 0;
  if (blockSize === 2) {
    determinant = key[0] * key[3] - key[1] * key[2];
  } else if (blockSize === 3) {
    determinant =
      key[0] * (key[4] * key[8] - key[5] * key[7]) -
      key[1] * (key[3] * key[8] - key[5] * key[6]) +
      key[2] * (key[3] * key[7] - key[4] * key[6]);
  }

  if (determinant === 0) {
    console.log("The key is invalid (determinant is 0).");
    return false;
  }

  return true;
}

function encrypt(input: string, keyAsStr: string): string {
  const hillCipher = new HillCipher();

  let key: number[];
  if (input.length % 2 === 0) {
    key = [1, 2, 3, 5];
    hillCipher.setKey(key);
  } else if (input.length % 3 === 0) {
    key = [1, 2, 3, 0, 1, 4, 5, 6, 0];
    hillCipher.setKey(key);
  } else {
    const paddingLength =
      input.length % 2 === 1 ? 2 - (input.length % 2) : 3 - (input.length % 3);
    input = input + "X".repeat(paddingLength);
    console.log(`Input length adjusted with padding: ${input}`);

    if (input.length % 2 === 0) {
      key = [1, 2, 3, 5];
      hillCipher.setKey(key);
    } else if (input.length % 3 === 0) {
      key = [1, 2, 3, 0, 1, 4, 5, 6, 0];
      hillCipher.setKey(key);
    } else {
      throw new Error("Invalid input length after padding");
    }
  }

  const blockSize = Math.sqrt(hillCipher.key.length);
  if (!isInvertible(hillCipher.key, blockSize)) {
    throw new Error("The key is invalid. Please provide a valid key.");
  }

  const plainTextNumbers = textToNumbers(input);
  const cipherTextNumbers = hillCipher.encrypt(plainTextNumbers);
  return numbersToText(cipherTextNumbers);
}

function decrypt(input: string, keyAsStr: string): string {
  const hillCipher = new HillCipher();

  let key: number[];
  if (input.length % 2 === 0) {
    key = [1, 2, 3, 5];
    hillCipher.setKey(key);
  } else if (input.length % 3 === 0) {
    key = [1, 2, 3, 0, 1, 4, 5, 6, 0];
    hillCipher.setKey(key);
  } else {
    const paddingLength =
      input.length % 2 === 1 ? 2 - (input.length % 2) : 3 - (input.length % 3);
    input = input + "X".repeat(paddingLength);
    console.log(`Input length adjusted with padding: ${input}`);

    if (input.length % 2 === 0) {
      key = [1, 2, 3, 5];
      hillCipher.setKey(key);
    } else if (input.length % 3 === 0) {
      key = [1, 2, 3, 0, 1, 4, 5, 6, 0];
      hillCipher.setKey(key);
    } else {
      throw new Error("Invalid input length after padding");
    }
  }

  const blockSize = Math.sqrt(hillCipher.key.length);
  if (!isInvertible(hillCipher.key, blockSize)) {
    throw new Error("The key is invalid. Please provide a valid key.");
  }

  const cipherTextNumbers = textToNumbers(input);
  const decryptedTextNumbers = hillCipher.decrypt(cipherTextNumbers);
  const decryptedTextNumbersWithoutPadding =
    hillCipher.removePadding(decryptedTextNumbers);
  return numbersToText(decryptedTextNumbersWithoutPadding);
}

export const hillAlgorithm = {
  encrypt,
  decrypt,
};
