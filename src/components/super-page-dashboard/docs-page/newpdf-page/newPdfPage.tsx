import React, { useRef } from "react";
import { useState } from "react";
import { db } from "@/src/services/db";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { allPdfsReducer } from "@/src/redux/slices/pdfStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { PdfStateTypes } from "@/src/types/interface";
import { CgAttachment } from "react-icons/cg";
import { MdOutlineAddBox } from "react-icons/md";
export default function NewPdfPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [displayedName, setDisplayedName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setDisplayedName(files[0].name);
    }
  };

  const handleAddPdf = async () => {
    if (!selectedFile) return toast.error("You need to select a PDF file.");
    const foundPdf = await db.pdfs
      .where("pdfName")
      .equals(selectedFile.name)
      .first();
    if (foundPdf) return toast.error("The PDF file already exists.");
    try {
      const pdfBlob: BlobPart = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(selectedFile);
      });

      await db.pdfs.add({
        name:
          displayedName === ""
            ? selectedFile.name
            : displayedName.replace(/\.pdf$/i, ""),
        pdfName: selectedFile.name,
        createdAt: Date.now(),
        id: uuidv4(),
        file: new Blob([pdfBlob], { type: selectedFile.type }),
      });
      setSelectedFile(null);
      fileInputRef.current!.value = "";
      setDisplayedName('')
      toast.success("The PDF file has been added.");

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
      dispatch(allPdfsReducer(statePdfs));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 max-w-96 mx-auto flex flex-col gap-2 items-center">
      <h1 className="font-bold text-center">Add PDF Files</h1>
      <div className="relative p-0 mx-auto flex flex-row justify-center items-center">
        <div className="absolute left-0 w-8 h-10 py-2">
          <CgAttachment className="absolute w-8 h-6" />
          <input
            className=" w-8 h-10 opacity-0 absolute cursor-pointer"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>
        <input
          className="primaryInput w-full h-10 !pl-8 !pr-10"
          type="text"
          value={displayedName}
          onChange={(e) => setDisplayedName(e.target.value)}
          placeholder="PDF name"
        />

        <MdOutlineAddBox onClick={handleAddPdf} className="absolute right-0 text-green-600 icon" />
      </div>
    </div>
  );
}
