import React, { useRef } from "react";
import { useState } from "react";
import { db } from "@/src/services/db";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ReadingPage() {
  const [pdfName, setPdfName] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setPdfFile(files[0]);
    }
  };

  const handleAddPdf = async () => {
    console.log(pdfFile);
    
    if (!pdfFile) {
      toast.error("You need to select a PDF file.");
    return
    }
    const foundPdf = await db.pdfs.where('name').equals(pdfFile.name).first()
    if(foundPdf){
      toast.error('The PDF file already exists.')
      return
    }
    await db.pdfs.add({
      name: pdfName === "" ? pdfFile!.name : pdfName,
      file: pdfFile!,
      createdAt: Date.now(),
      id: uuidv4(),
    });
    toast.success("The PDF file has been added.");

    setPdfName("");
    fileInputRef.current!.value = '';
    router.push('/study/books')
    
  };

  return (
    <div className="p-4 flex flex-col gap-4 justify-center">
      <h1 className="font-bold text-center">Add PDF File</h1>
      <div className="flex flex-col justify-center">
        <input
          className="primaryInput  text-center"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <input
          className="primaryInput scale-75"
          type="text"
          value={pdfName}
          onChange={(e) => setPdfName(e.target.value)}
          placeholder="PDF Displyed Name"
        />
      </div>
      <button onClick={handleAddPdf} className="primaryBtn mx-auto">
        Add PDF
      </button>
    </div>
  );
}
