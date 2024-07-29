import React, { useEffect, useState } from "react";
import LoadingPulses from "../../../../general/loading-comps/loadingPulses/loadingPulses";
import Book from "./book/book";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { allPdfsReducer } from "@/src/redux/slices/pdfStateSlice";
import getPDFsHandler from "../handlers/getPDFsHandler";
import { PdfStateTypes } from "@/src/types/interface";

export default function BooksPage() {
  const { pdfs } = useAppSelector((state) => state.pdfState);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const pdfs = await getPDFsHandler();
        dispatch(allPdfsReducer(pdfs!));
        setLoading(false);
      } catch (error) {}
    };
    fetchPdfs();
  }, [dispatch]);
  if (loading) return <LoadingPulses />;
  return (
    <div className="p-4 mb-24 sm:mb-16">
      <div>
        {pdfs.length === 0 ? (
          <div className="text-center text-red-500 my-8">
            There is no books to read.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 justify-around">
            {pdfs.map((book: PdfStateTypes, i: number) => (
              <div key={book.id}>
                <Book book={book} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
