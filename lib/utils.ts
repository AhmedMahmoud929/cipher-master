import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function urlToFile(imageUrl: string) {
  try {
    // Fetch the image from the URL
    const response = await fetch(imageUrl);

    // Convert the response into a Blob
    const blob = await response.blob();

    // Create a File from the Blob
    const file = new File([blob], crypto.randomUUID(), { type: blob.type });

    return file;
  } catch (error) {
    console.error("Error converting URL to file:", error);
    return null;
  }
}

export function formatAddress(address: string | undefined) {
  if (!address) return "";
  // Split the address into parts
  const parts = address.split("،").map((part) => part.trim());

  // Remove duplicates
  const uniqueParts = [...new Set(parts)];

  // Remove plus codes (e.g., X8MH+MV5)
  const filteredParts = uniqueParts.filter(
    (part) => !part.match(/^[A-Z0-9]+\+[A-Z0-9]+$/)
  );

  // Separate Arabic and English parts
  const arabicParts = filteredParts.filter((part) =>
    /[\u0600-\u06FF]/.test(part)
  );
  const englishParts = filteredParts.filter(
    (part) => !/[\u0600-\u06FF]/.test(part)
  );

  // Format the result
  const formattedArabic = arabicParts.join("، ");
  const formattedEnglish = englishParts.join(", ");

  return `${formattedArabic} - ${formattedEnglish}`;
}

export function isColor(color: string, state: string) {
  if (color === "green" && state === "تم الإتفاق بنجاح") return true;
  else if (color === "blue" && state === "طلب مكرر") return true;
  else if (
    color === "red" &&
    [
      "لم يتم الرد",
      "الهاتف مغلق",
      "الرقم غير صحيح",
      "السيارة غير متوفرة",
    ].includes(state)
  )
    return true;
  else return false;
}
