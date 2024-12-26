function encrypt(input: string, key: string): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const normalizedInput = input.toUpperCase();
  const normalizedKey = key.toUpperCase();

  return normalizedInput
    .split("")
    .map((char) => {
      const index = alphabet.indexOf(char);
      return index !== -1 ? normalizedKey[index] : char;
    })
    .join("");
}

function decrypt(input: string, key: string): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const normalizedInput = input.toUpperCase();
  const normalizedKey = key.toUpperCase();

  return normalizedInput
    .split("")
    .map((char) => {
      const index = normalizedKey.indexOf(char);
      return index !== -1 ? alphabet[index] : char;
    })
    .join("");
}

export const monoalphabeticAlgorithm = {
  encrypt,
  decrypt,
};
