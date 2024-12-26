import {
  Binary,
  BookLock,
  Code2,
  FileText,
  Flame,
  Grid,
  Hash,
  IdCard,
  Inbox,
  Key,
  LayoutDashboard,
  Send,
  Settings,
  Shuffle,
  TableProperties,
  User,
  Users,
  Workflow,
} from "lucide-react";
import { Tajawal } from "next/font/google";

export const tajawal = Tajawal({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
});

export const sidebarItems = [
  {
    label: "Playfair Cipher",
    href: "playfair-cipher",
    icon: <TableProperties className="h-5 w-5 mr-2" />,
  },
  {
    label: "Rail Fence Cipher",
    href: "rail-fence-cipher",
    icon: <Shuffle className="h-5 w-5 mr-2" />,
  },
  {
    label: "Monoalphabetic Cipher",
    href: "monoalphabetic-cipher",
    icon: <FileText className="h-5 w-5 mr-2" />,
  },
  {
    label: "Polyalphabetic Cipher",
    href: "polyalphabetic-cipher",
    icon: <Key className="h-5 w-5 mr-2" />,
  },
  {
    label: "Hill Alphabetic Cipher",
    href: "hill-cipher",
    icon: <Hash className="h-5 w-5 mr-2" />,
  },
  {
    label: "One Time Pad Cipher",
    href: "one-time-pad-cipher",
    icon: <Binary className="h-5 w-5 mr-2" />,
  },
  {
    label: "Ceaser Cipher",
    href: "ceaser-cipher",
    icon: <BookLock className="h-5 w-5 mr-2" />,
  },
  {
    label: "Row Column Transposition Cipher",
    href: "row-column-cipher",
    icon: <Grid className="h-5 w-5 mr-2" />,
  },
];

export type IAlgorithmId =
  | "playfair"
  | "rail-fence"
  | "monoalphabetic"
  | "polyalphabetic"
  | "hill"
  | "one-time-pad"
  | "ceaser"
  | "row-column";

export interface Algorithm {
  id: IAlgorithmId;
  name: string;
  description: string;
  videoId: string;
  howItWorks: string[];
  keyFeatures: string[];
  historicalContext: string;
  complexity: {
    encryption: string;
    decryption: string;
    keySpace: string;
  };
}

export const algorithmsDetails: Algorithm[] = [
  {
    id: "playfair",
    name: "Playfair Cipher",
    description:
      "A manual symmetric encryption technique that encrypts pairs of letters (digraphs) instead of single letters as in traditional substitution ciphers.",
    videoId: "UURjVI5cw4g",
    howItWorks: [
      "Create a 5×5 matrix of letters based on a keyword",
      "Split the plaintext into digrams (pairs of letters)",
      "If letters appear in same row, use letters to their right",
      "If letters in same column, use letters below them",
      "If letters form rectangle, use letters on same row at opposite corner",
    ],
    keyFeatures: [
      "Digraph substitution instead of single letter",
      "Resistant to frequency analysis",
      "Quick to implement in field operations",
      "Historically used in military communications",
    ],
    historicalContext:
      "Invented by Charles Wheatstone in 1854, but named after Lord Playfair who promoted its use. It was used for tactical purposes by British forces in the Boer War and World War I.",
    complexity: {
      encryption: "O(n)",
      decryption: "O(n)",
      keySpace: "25! (approximately 1.5 × 10^25)",
    },
  },
  {
    id: "rail-fence",
    name: "Rail Fence Cipher",
    description:
      "A transposition cipher that arranges plaintext letters in a zigzag pattern across a number of rails and reads off the cipher text by rows.",
    videoId: "knE4G8DGLoY",
    howItWorks: [
      "Write text in zigzag pattern on a number of rails",
      "Read off each rail to get ciphertext",
      "Number of rails serves as the key",
      "Pattern follows down and up diagonal movements",
    ],
    keyFeatures: [
      "Simple geometric transposition cipher",
      "Key is the number of rails used",
      "No letter substitution involved",
      "Pattern is easily visualizable",
    ],
    historicalContext:
      "One of the oldest and simplest transposition ciphers, used in ancient times for basic message security. It was commonly used during the American Civil War.",
    complexity: {
      encryption: "O(n)",
      decryption: "O(n)",
      keySpace: "Limited by message length",
    },
  },
  {
    id: "monoalphabetic",
    name: "Monoalphabetic Cipher",
    description:
      "A substitution cipher where each letter in the plaintext is replaced by another letter consistently throughout the message.",
    videoId: "J-utjSeUq_c",
    howItWorks: [
      "Create a substitution key mapping each letter to another",
      "Replace each letter in plaintext with its mapped letter",
      "Maintain the same substitution throughout the message",
      "Spaces and punctuation can be preserved or encoded",
    ],
    keyFeatures: [
      "One-to-one letter mapping",
      "Easy to implement",
      "Vulnerable to frequency analysis",
      "26! possible keys for English alphabet",
    ],
    historicalContext:
      "One of the earliest known ciphers, famously used in the form of Caesar cipher by Julius Caesar for military communications.",
    complexity: {
      encryption: "O(n)",
      decryption: "O(n)",
      keySpace: "26! (approximately 4 × 10^26)",
    },
  },
  {
    id: "polyalphabetic",
    name: "Polyalphabetic Cipher",
    description:
      "A substitution cipher using multiple substitution alphabets, typically chosen by using a keyword to shift the alphabet.",
    videoId: "Ic4BzVggNY8",
    howItWorks: [
      "Choose a keyword to determine substitution alphabets",
      "Each letter of keyword indicates shift amount",
      "Apply different shifts to each plaintext letter",
      "Repeat keyword for message length",
    ],
    keyFeatures: [
      "Multiple substitution alphabets",
      "More secure than monoalphabetic",
      "Periodic pattern based on keyword length",
      "Harder to break using frequency analysis",
    ],
    historicalContext:
      "Developed by Leon Battista Alberti in the 15th century, later improved by Johannes Trithemius, and popularized by Blaise de Vigenère.",
    complexity: {
      encryption: "O(n)",
      decryption: "O(n)",
      keySpace: "26^k where k is key length",
    },
  },
  {
    id: "hill",
    name: "Hill Alphabetic Cipher",
    description:
      "A polygraphic substitution cipher based on linear algebra, encrypting blocks of letters using matrix multiplication.",
    videoId: "-EQ8UomTrAQ",
    howItWorks: [
      "Convert text to numerical values",
      "Create key matrix of size n×n",
      "Multiply blocks of n letters by key matrix",
      "Convert results back to letters",
    ],
    keyFeatures: [
      "Based on linear algebra",
      "Works on blocks of letters",
      "Strong against frequency analysis",
      "Requires invertible key matrix",
    ],
    historicalContext:
      "Invented by Lester S. Hill in 1929, it was one of the first practical polygraphic ciphers that could operate on more than three symbols at once.",
    complexity: {
      encryption: "O(n^3)",
      decryption: "O(n^3)",
      keySpace: "Depends on matrix size",
    },
  },
  {
    id: "one-time-pad",
    name: "One Time Pad Cipher",
    description:
      "A perfectly secure encryption method when used correctly, using a random key the same length as the message that is never reused.",
    videoId: "6iYqHn3q8sY&t",
    howItWorks: [
      "Generate truly random key same length as message",
      "Convert message and key to numbers",
      "Add message and key modulo 26",
      "Never reuse the key",
    ],
    keyFeatures: [
      "Theoretically unbreakable if used properly",
      "Key must be truly random",
      "Key must be same length as message",
      "Key can never be reused",
    ],
    historicalContext:
      "Developed in 1917 by Gilbert Vernam and Joseph Mauborgne, it was used for diplomatic and military communications during World War II and the Cold War.",
    complexity: {
      encryption: "O(n)",
      decryption: "O(n)",
      keySpace: "2^n where n is message length",
    },
  },

  {
    id: "ceaser",
    name: "Caesar Cipher",
    description:
      "A substitution cipher where each letter in the plaintext is shifted by a certain number of positions in the alphabet.",
    videoId: "JtbKh_12ctg",
    howItWorks: [
      "Choose a shift value (key)",
      "Shift each letter in the plaintext by the key value",
      "Wrap around the alphabet if the shift goes past 'z'",
      "The ciphertext is the result of the shifted letters",
    ],
    keyFeatures: [
      "Simple and easy to implement",
      "Caesar Cipher has a small key space (only 25 possible keys)",
      "Vulnerable to frequency analysis due to the fixed shift",
      "Can be easily decrypted with brute force (since there are only 25 possible keys)",
    ],
    historicalContext:
      "Named after Julius Caesar, who used it to encrypt military messages. One of the oldest known ciphers and still widely studied for its simplicity.",
    complexity: {
      encryption: "O(n)",
      decryption: "O(n)",
      keySpace: "25 possible keys (for English alphabet)",
    },
  },
  {
    id: "row-column",
    name: "Row Column Transposition Cipher",
    description:
      "A transposition cipher that rearranges the plaintext by writing it in rows of fixed length and reading it out by columns in a specified order.",
    videoId: "cPQXaYUMOjQ",
    howItWorks: [
      "Write message in rows of fixed length",
      "Number the columns",
      "Rearrange columns according to key",
      "Read off by columns to get ciphertext",
    ],
    keyFeatures: [
      "Transposition rather than substitution",
      "Can be done with simple materials",
      "Multiple rounds increase security",
      "Key determines column order",
    ],
    historicalContext:
      "Widely used during World War I and II for military communications, often in combination with other ciphers for added security.",
    complexity: {
      encryption: "O(n)",
      decryption: "O(n)",
      keySpace: "n! where n is number of columns",
    },
  },
];
