import { IAlgorithmId } from "@/constants";
import { oneTimePadAlgorithm } from "./one-time-pad";
import { rowColTranspositionAlgorithm } from "./row-col-transposition";
import { CeaserAlgorithm } from "./ceaser";
import { monoalphabeticAlgorithm } from "./monoalphabetic";
import { railFenceAlgorithm } from "./rail-fence";
import { hillAlgorithm } from "./hill";
import { playfairAlgorithm } from "./playfair";

export const algorithms: Record<IAlgorithmId, any> = {
  "one-time-pad": oneTimePadAlgorithm, //  Mahmoud: Done
  ceaser: CeaserAlgorithm, // Mahmoud: Done
  hill: hillAlgorithm, // Elkholy: Done
  monoalphabetic: monoalphabeticAlgorithm, // ^ Ghofra
  playfair: playfairAlgorithm, // Mansour: Done
  polyalphabetic: oneTimePadAlgorithm, // ! Elkholy + Ghofra
  "rail-fence": railFenceAlgorithm, // Mansour: Done
  "row-column": rowColTranspositionAlgorithm, // Abdullah: Done
};
