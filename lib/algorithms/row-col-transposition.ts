/* Encryption Function */
function encrypt(plaintext: string, key: string): string {
  // Remove white spaces from the plaintext
  plaintext = plaintext.replace(/\s+/g, "");

  const numRows = Math.ceil(plaintext.length / key.length);
  const grid: string[][] = Array.from({ length: numRows }, () =>
    Array(key.length).fill("")
  );

  // Fill the grid with the plaintext
  for (let i = 0; i < plaintext.length; i++) {
    const row = Math.floor(i / key.length);
    const col = i % key.length;
    grid[row][col] = plaintext[i];
  }

  // Fill remaining empty spaces with 'z'
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < key.length; col++) {
      if (grid[row][col] === "") {
        grid[row][col] = "z";
      }
    }
  }

  // Read the grid by columns based on the key order
  const sortedKeyIndices = [...key]
    .map((_, i) => i)
    .sort((a, b) => key[a].localeCompare(key[b]));
  let ciphertext = "";

  for (const index of sortedKeyIndices) {
    for (let row = 0; row < numRows; row++) {
      ciphertext += grid[row][index];
    }
  }

  return ciphertext;
}

/* Decryption Function */
function decrypt(ciphertext: string, key: string): string {
  const numRows = Math.ceil(ciphertext.length / key.length);
  const grid: string[][] = Array.from({ length: numRows }, () =>
    Array(key.length).fill("")
  );

  // Fill the grid column-wise based on the key order
  const sortedKeyIndices = [...key]
    .map((_, i) => i)
    .sort((a, b) => key[a].localeCompare(key[b]));
  let currentIndex = 0;

  for (const index of sortedKeyIndices) {
    for (let row = 0; row < numRows; row++) {
      if (currentIndex < ciphertext.length) {
        grid[row][index] = ciphertext[currentIndex];
        currentIndex++;
      }
    }
  }

  // Read the grid row-wise to get the plaintext
  let plaintext = "";
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < key.length; col++) {
      plaintext += grid[row][col];
    }
  }

  // Remove 'z' padding characters and return the original plaintext
  return plaintext.replace(/z+$/, "").replace(/\s+/g, ""); // Ensure no whitespaces remain
}

// Constraint : Cannot contains any special character
export const rowColTranspositionAlgorithm = { encrypt, decrypt };