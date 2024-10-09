import { db } from "@/src/services/db";
import { PdfStateTypes } from "@/src/types/interface";

export default async function getPDFsHandler() {
  try {
    const pdfs = await db.pdfs.toArray();
    const statePdfs: PdfStateTypes[] = [];
    pdfs.forEach((pdf) => {
      const url = URL.createObjectURL(pdf.file!);
      delete pdf.file;
      statePdfs.push({ ...pdf, url });
    });
    return statePdfs;
  } catch (error) {}
}
