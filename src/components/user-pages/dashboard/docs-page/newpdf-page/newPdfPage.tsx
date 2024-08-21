import { useRef } from "react";
import { useState } from "react";
import { db } from "@/src/services/db";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { allPdfsReducer } from "@/src/redux/slices/pdfStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { CgAttachment } from "react-icons/cg";
import { IoIosAdd } from "react-icons/io";
import getPDFsHandler from "../handlers/getPDFsHandler";
import BooksInfo from "./booksInfo/booksInfo";

export default function NewPdfPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [displayedName, setDisplayedName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setDisplayedName(files[0].name.replace(/\.pdf$/i, ""));
      nameInputRef.current?.focus();
    }
  };

  const handleAddPdf = async () => {
    if (!selectedFile) return toast.error("You need to select a PDF file.");
    if (displayedName.trim() === "")
      return toast.error("You need a name for your file.");
    if (displayedName.length < 3 || displayedName.length > 20) return;

    const foundPdf = await db.pdfs
      .where("pdfName")
      .equals(selectedFile.name)
      .first();
    if (foundPdf) return toast.error("The PDF file already exists.");

    try {
      const pdfFile: BlobPart = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(selectedFile);
      });
      const blobFile = new Blob([pdfFile], { type: selectedFile.type });
      await db.pdfs.add({
        id: uuidv4(),
        name: displayedName,
        pdfName: selectedFile.name,
        lastVisitedPage: 0,
        file: blobFile,
        numberOfPages: 0,
        createdAt: Date.now(),
      });
      setSelectedFile(null);
      fileInputRef.current!.value = "";
      setDisplayedName("");
      toast.success("The PDF file has been added.");

      const pdfs = await getPDFsHandler();
      if (pdfs) dispatch(allPdfsReducer(pdfs));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 max-w-96 mx-auto flex flex-col gap-2 items-center">
      <h1 className="font-bold text-center">Add PDF Files</h1>
      <div className="flex flex-row w-full items-center gap-4">
        <BooksInfo />
        <div className="relative p-0 mx-auto flex flex-row justify-center items-center">
          <div className="absolute left-0 w-8 h-10 py-2">
            <CgAttachment className="absolute w-8 h-6 text-blue-400" />
            <input
              className=" w-8 h-10 opacity-0 absolute cursor-pointer"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>
          <input
            className="primaryInput !w-full h-12 !pl-10 !pr-12"
            type="text"
            value={displayedName}
            ref={nameInputRef}
            onChange={(e) => setDisplayedName(e.target.value)}
            placeholder="PDF name"
          />

          <IoIosAdd
            onClick={handleAddPdf}
            className="icon absolute right-0 text-blue-400"
          />
        </div>
        {displayedName.length < 3 ||
          (displayedName.length > 20 && (
            <p className="w-full text-red-500">PDF name must be 3-20 letters</p>
          ))}
      </div>
    </div>
  );
}
