import { IAlgorithmId } from "@/constants";
import { z } from "zod";

const oneTimePadSchema = z
  .object({
    input: z.string().min(1, {
      message: "Input messsage required",
    }),
    key: z.string().min(1, {
      message: "Key text required",
    }),
  })
  .refine(
    (data) => {
      const inputLength = data.input.replace(/\s/g, "").length; // Remove spaces and get the length
      return data.key.length === inputLength;
    },
    {
      message: "Key length must match the input length (excluding spaces).",
      path: ["key"], // Point the error to the 'key' field
    }
  );

const ceaserSchema = z.object({
  input: z.string().min(1, {
    message: "Input messsage required",
  }),
  key: z
    .string()
    .regex(/^[0-9]+$/, {
      message: "Key must be a number",
    }) // Ensure the key is a string of digits
    .refine(
      (val) => {
        const num = parseInt(val, 10);
        return num >= 0 && num <= 25; // Ensure the number is between 0 and 25
      },
      { message: "Key must be between 0 and 25" }
    ),
});

const hillSchema = z.object({
  input: z.string().min(1, {
    message: "Input messsage required",
  }),
  key: z
    .string()
    .regex(/^[0-9]+$/, {
      message: "Key must be a number",
    }) // Ensure the key is a string of digits
    .refine(
      (val) => {
        const len = val.length;
        return len === 4 || len === 9; // Ensure the matrix is 2x2 or 3x3
      },
      { message: "Key should be 2x2 (4-chars) or 3x3 (9-chars)" }
    ),
});

const railFenceSchema = z.object({
  input: z.string().min(1, {
    message: "Input messsage required",
  }),
  key: z.enum(["2", "3"], {
    message: "Key has to be only 2 or 3",
  }),
});

const playfairSchema = z.object({
  input: z
    .string()
    .min(1, { message: "Input cannot be empty" })
    .regex(/^[a-zA-Z]*$/, {
      message: "Input can only contain letters",
    }),

  key: z
    .string()
    .min(1, { message: "Key cannot be empty" })
    .regex(/^[a-zA-Z0-9]*$/, {
      message: "Key can only contain letters and numbers",
    }),
});

const noSpecialCharsSchema = z.object({
  input: z
    .string()
    .min(1, { message: "Input cannot be empty" })
    .regex(/^[a-zA-Z0-9]*$/, {
      message: "Input can only contain letters and numbers",
    }),

  key: z
    .string()
    .min(1, { message: "Key cannot be empty" })
    .regex(/^[a-zA-Z0-9]*$/, {
      message: "Key can only contain letters and numbers",
    }),
});

const onlyLettersSchema = z.object({
  input: z
    .string()
    .min(1, { message: "Input cannot be empty" })
    .regex(/^[a-zA-Z]*$/, {
      message: "Input can only contain letters",
    }),

  key: z
    .string()
    .min(1, { message: "Key cannot be empty" })
    .regex(/^[a-zA-Z]*$/, {
      message: "Key can only contain letters",
    }),
});

export const schemas: Record<IAlgorithmId, any> = {
  "one-time-pad": oneTimePadSchema, // Done
  ceaser: ceaserSchema, // Done
  hill: hillSchema, // Done
  "rail-fence": railFenceSchema, // Done
  playfair: playfairSchema, // Done

  monoalphabetic: onlyLettersSchema, // Done
  polyalphabetic: onlyLettersSchema, // Done

  "row-column": noSpecialCharsSchema, // Done
};
