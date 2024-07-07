import { db } from "@/src/services/db";
import { PdfStateTypes } from "@/src/types/interface";
export const getPDFsHandler = async () => {
  try {
    const pdfs = await db.pdfs.toArray();
    const statePdfs: PdfStateTypes[] = [];
    pdfs.forEach((pdf) => {
      const { file, ...rest } = pdf;
      const statePdf = {
        ...rest,
        url: URL.createObjectURL(pdf.file!),
        size: pdf.file!.size,
      };
      statePdfs.push(statePdf);
    });
    return statePdfs;
  } catch (error) {}
};
