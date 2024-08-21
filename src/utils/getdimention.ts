import { pageHeight } from "@/data/quran-metadata/mushaf-elmadina-warsh-azrak/spec";

export const getDimention = (dimention: number, newHeight: number) => {
  const x = (100 * newHeight) / pageHeight;

  return (dimention * x) / 100;
};
