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
import limits from "@/src/handlers/general/limits/limits";

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
    if (isNotValidInputName(displayedName))
      return nameInputRef.current?.focus();

    const foundPdfName = await db.pdfs
      .where({ pdfName: selectedFile.name })
      .first();
    if (foundPdfName) return toast.error("The PDF file already exists.");
    const foundName = await db.pdfs.where({ name: displayedName }).first();
    if (foundName) return toast.error("This name already exists.");

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
  const isNotValidInputName = (inputText: string) => {
    return (
      inputText.length < limits.minDocNameLimit ||
      inputText.length > limits.maxDocNameLimit
    );
  };
  return (
    <div className="p-4 w-full max-w-lg mx-auto flex flex-col gap-2 items-center justify-center">
      <div className="flex gap-2">
        <BooksInfo />
        <h1 className="font-bold text-center">Add PDF Files</h1>
      </div>
        <div className="flex flex-col">
          <div className="relative p-0 mx-auto flex flex-row justify-center items-center">
            <div className="absolute left-0 w-8 h-10 py-2">
              <CgAttachment
                className={` ${selectedFile ? " text-green-500 " : " text-blue-400 "}absolute w-8 h-6 `}
              />
              <input
                className="w-8 h-10 opacity-0 absolute cursor-pointer"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </div>
            <input
              className="primaryInput h-12 !pl-10 !pr-12 !w-full"
              type="text"
              value={displayedName}
              ref={nameInputRef}
              onChange={(e) => setDisplayedName(e.target.value)}
              placeholder="PDF name"
            />

            {selectedFile && (
              <IoIosAdd
                onClick={handleAddPdf}
                className="icon absolute right-0 text-blue-400 !text-4xl"
              />
            )}
          </div>
          {selectedFile && isNotValidInputName(displayedName) && (
            <p className="w-full text-red-500">
              PDF name must be {limits.minDocNameLimit}-{limits.maxDocNameLimit}{" "}
              letters
            </p>
          )}
        </div>
    </div>
  );
}
