import { db } from "@/src/services/db";

export default async function getPDFHandler(pdfId?: string) {
  try {
    if (pdfId) {
      const pdfs = await db.pdfs.toArray();
      pdfs.forEach((pdf) => delete pdf.file);

      return pdfs;
    } else {
      const pdf = await db.pdfs.get(pdfId);
      delete pdf?.file;
      return pdf;
    }
  } catch (error) {}
}
