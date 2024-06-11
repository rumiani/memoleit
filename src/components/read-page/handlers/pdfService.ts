import { db } from "@/src/services/db";
import { PdfTypes } from "@/src/types/interface";
import { v4 as uuidv4 } from "uuid";

export const addPdfFile = async (name: string, file: Blob): Promise<number> => {
  return await db.pdfs.add({ name, file, id: uuidv4() });
};

export const getPdfFileById = async (
  id: number
): Promise<PdfTypes | undefined> => {
  return await db.pdfs.get(id);
};

export const getAllPdfFiles = async (): Promise<PdfTypes[]> => {
  return await db.pdfs.toArray();
};
