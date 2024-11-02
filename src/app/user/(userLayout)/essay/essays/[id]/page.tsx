"use client";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import NotFoundComp from "@/src/components/general/notFoundComp/notFoundComp";
import notFoundError from "@/src/handlers/notFoundError";
import { db } from "@/src/services/db";
import { useEffect, useState } from "react";
import { essayObjectReducer } from "@/src/redux/slices/essayStateSlice";
import Essay from "@/src/components/user-pages/dashboard/essay-page/essay/essay";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";

export default function Item({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { essayObject } = useAppSelector((state) => state.essayState);
  const dispatch = useAppDispatch();

  useEffect(() => {    
    setNotFound(false);
    const fetchEssay = async () => {
      try {
        const essayFound = await db.essays.get(params.id);
        if (!essayFound) {
          setNotFound(true);
          throw notFoundError("404");
        }
        dispatch(essayObjectReducer({ ...essayFound }));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchEssay();
  }, [params, dispatch]);

  if (loading) return <div className="my-4"><LoadingPulse /></div>;
  return <>{notFound ? <NotFoundComp /> : <Essay essay={essayObject} />}</>;
}
