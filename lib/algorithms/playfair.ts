type Matrix = string[][];

// Create the key square matrix
function generateKeySquare(key: string): Matrix {
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  let keySquare = "";

  // Add key characters first (removing duplicates)
  key = key
    .toUpperCase()
    .replace(/J/g, "I")
    .replace(/[^A-Z]/g, "");
  for (let char of key) {
    if (!keySquare.includes(char)) {
      keySquare += char;
    }
  }

  // Add remaining alphabet characters
  for (let char of alphabet) {
    if (!keySquare.includes(char)) {
      keySquare += char;
    }
  }

  // Convert to 5x5 matrix
  let matrix: Matrix = [];
  for (let i = 0; i < 5; i++) {
    matrix[i] = keySquare.substr(i * 5, 5).split("");
  }
  return matrix;
}

// Find position of a character in the matrix
function findPosition(matrix: Matrix, char: string): [number, number] {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (matrix[row][col] === char) {
        return [row, col];
      }
    }
  }
  throw new Error(`Character ${char} not found in matrix`);
}

// Encrypt function
function encrypt(text: string, key: string): string {
  // Prepare text
  text = text
    .toUpperCase()
    .replace(/J/g, "I")
    .replace(/[^A-Z]/g, "");

  // Add 'X' between double letters and at the end if needed
  let prepared = "";
  for (let i = 0; i < text.length; i++) {
    prepared += text[i];
    if (i < text.length - 1) {
      if (text[i] === text[i + 1]) {
        prepared += "X";
      }
    }
  }
  if (prepared.length % 2 !== 0) prepared += "X";

  // Generate key square
  let matrix = generateKeySquare(key);

  // Encrypt pairs
  let result = "";
  for (let i = 0; i < prepared.length; i += 2) {
    let char1 = prepared[i];
    let char2 = prepared[i + 1];
    let [row1, col1] = findPosition(matrix, char1);
    let [row2, col2] = findPosition(matrix, char2);

    if (row1 === row2) {
      result += matrix[row1][(col1 + 1) % 5];
      result += matrix[row2][(col2 + 1) % 5];
    } else if (col1 === col2) {
      result += matrix[(row1 + 1) % 5][col1];
      result += matrix[(row2 + 1) % 5][col2];
    } else {
      result += matrix[row1][col2];
      result += matrix[row2][col1];
    }
  }

  return result;
}

// Main decryption function
function decrypt(ciphertext: string, key: string): string {
  // Prepare the ciphertext
  ciphertext = ciphertext
    .toUpperCase()
    .replace(/J/g, "I")
    .replace(/[^A-Z]/g, "");

  // Create digraphs
  let digraphs: [string, string][] = [];
  for (let i = 0; i < ciphertext.length; i += 2) {
    digraphs.push([ciphertext[i], ciphertext[i + 1]]);
  }

  // Create key square
  const keySquare = generateKeySquare(key);

  // Decrypt each digraph
  let plaintext = "";

  digraphs.forEach(([a, b]) => {
    const [row1, col1] = findPosition(keySquare, a);
    const [row2, col2] = findPosition(keySquare, b);

    let newChar1: string, newChar2: string;

    if (row1 === row2) {
      // Same row - take characters to the left
      newChar1 = keySquare[row1][(col1 + 4) % 5];
      newChar2 = keySquare[row2][(col2 + 4) % 5];
    } else if (col1 === col2) {
      // Same column - take characters above
      newChar1 = keySquare[(row1 + 4) % 5][col1];
      newChar2 = keySquare[(row2 + 4) % 5][col2];
    } else {
      // Rectangle - take characters at opposite corners
      newChar1 = keySquare[row1][col2];
      newChar2 = keySquare[row2][col1];
    }

    plaintext += newChar1 + newChar2;
  });

  return plaintext;
}

export const playfairAlgorithm = {
  encrypt,
  decrypt,
};
