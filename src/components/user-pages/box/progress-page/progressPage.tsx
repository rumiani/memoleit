import { useEffect, useState } from "react";
import BoxChart from "./boxChart/boxChart";
import { useAppDispatch } from "@/src/app/hooks";
import { categoriesReducer } from "@/src/redux/slices/categoryStateSlice";
import { CategoryTypes } from "@/src/types/interface";
import { getCategoriesHandler } from "@/src/handlers/getCategoriesHandler";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";

export default function ProgressPage() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getCategoriesHandler()
      .then((newCategories?: CategoryTypes[]) => {
        dispatch(categoriesReducer(newCategories!));
        setIsLoading(false);
      })
      .catch(() => console.log("error"));
  }, [dispatch]);

  return <>{isLoading ? <LoadingPulse /> : <BoxChart />}</>;
}
