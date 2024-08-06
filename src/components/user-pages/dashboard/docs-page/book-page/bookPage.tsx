import { useEffect } from "react";
import { db } from "@/src/services/db";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import DocContainer from "./docContainer/docContainer";
import { toast } from "react-toastify";
import { capitalize } from "lodash";
import { pdfReducer } from "@/src/redux/slices/pdfStateSlice";

export default function BookPage({ id }: { id: string }) {
  const { category, title } = useAppSelector(
    (state) => state.itemState.formData,
  );
  const { pdf } = useAppSelector((state) => state.pdfState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const pdfFound = await db.pdfs.get(id);
        if (!pdfFound) return toast.error("PDF was not found");
        const { file, ...rest } = pdfFound;
        const url = URL.createObjectURL(pdfFound.file!);
        dispatch(pdfReducer({ ...rest, url }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPdf();
  }, [id, dispatch]);

  return (
    <div className="w-full h-screen my-4">
      {pdf.url !== "" && (
        <div className="relative">
          <h1 className="font-bold text-center">{capitalize(category)}</h1>
          <DocContainer />
        </div>
      )}
    </div>
  );
}
