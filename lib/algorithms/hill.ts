class HillCipher {
  // Method to encrypt a message using Hill Cipher
  encrypt(plain: string, keyAsStr: string): string {
    const keyArr = keyAsStr.split("");
    const key = keyArr.map((item) => parseInt(item, 10));
    // Apply padding to make the length divisible by 2 or 3
    let plainNumbers = this.textToNumbers(plain);
    plainNumbers = this.applyPadding(plainNumbers, key.length);

    let cipher: number[] = [];
    let blockSize = Math.sqrt(key.length);
    for (let i = 0; i < plainNumbers.length; i += blockSize) {
      let block = plainNumbers.slice(i, i + blockSize);
      let cipherBlock = this.multiplyMatrix(block, key, blockSize);
      cipher.push(...cipherBlock.map((num) => this.mod26(num)));
    }
    return cipher.join("");
  }
  // Method to decrypt a message using Hill Cipher
  decrypt(cipher: number[], keyAsStr: string): string {
    const keyArr = keyAsStr.split("");
    const key = keyArr.map((item) => parseInt(item, 10));
    // Apply padding to make the length divisible by 2 or 3
    cipher = this.applyPadding(cipher, key.length);

    let plain: number[] = [];
    let blockSize = Math.sqrt(key.length);
    let inverseKey = this.findInverseKey(key, blockSize);
    for (let i = 0; i < cipher.length; i += blockSize) {
      let block = cipher.slice(i, i + blockSize);
      let plainBlock = this.multiplyMatrix(block, inverseKey, blockSize);
      plain.push(...plainBlock.map((num) => this.mod26(num)));
    }
    return this.numbersToText(plain);
  }

  // textToNumbers
  private textToNumbers(text: string): number[] {
    return text
      .toUpperCase()
      .split("")
      .map((char) => char.charCodeAt(0) - 65);
  }

  // numbersToText
  private numbersToText(numbers: number[]): string {
    return numbers.map((num) => String.fromCharCode(num + 65)).join("");
  }

  // Method to multiply matrices
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

  // Method to find the inverse of the key matrix
  private findInverseKey(key: number[], blockSize: number): number[] {
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
      console.log(
        "Error: The key matrix is not invertible (determinant is 0). Please provide a valid key."
      );
      throw new Error("Key matrix is not invertible");
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
      // Calculate inverse for 3x3 matrix (you can add the code here if needed)
    }
    return inverseKey;
  }

  // Method to find modular inverse
  private modInverse(a: number, m: number): number {
    a = a % m;
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) return x;
    }
    return -1; // No modular inverse exists
  }

  // Method to ensure results are in the range [0, 25]
  private mod26(num: number): number {
    return ((num % 26) + 26) % 26;
  }

  // Method to apply padding to make the length divisible by 2 or 3
  private applyPadding(plain: number[], keyLength: number): number[] {
    let blockSize = Math.sqrt(keyLength);
    let remainder = plain.length % blockSize;

    // If the length is not divisible by blockSize (2 or 3), we add padding
    if (remainder !== 0) {
      let paddingLength = blockSize - remainder;
      for (let i = 0; i < paddingLength; i++) {
        plain.push(23); // Add padding character (X = 23)
      }
    }
    return plain;
  }
}

const hillCipher = new HillCipher();

export const hillAlgorithm = {
  encrypt: hillCipher.encrypt,
  decrypt: hillCipher.decrypt,
};
