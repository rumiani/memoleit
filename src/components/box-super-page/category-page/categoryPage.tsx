import React, { useEffect, useState } from "react";
import Link from "next/link";
import CategoryOptions from "./categoryOptions/categoryOptions";
import CategoryItems from "./categoryItems/categoryItems";
import { findCategoryById } from "@/src/handlers/findCategoryById";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/src/app/hooks";
import { categoryReducer } from "@/src/redux/slices/categoryStateSlice";
import LoadingPulse from "../../general/loading-comps/loadingPulse/loadingPulse";

export default function CategoryPage({ categoryId }: { categoryId: string }) {
  const [isCategory, setIsCategory] = useState<boolean | undefined>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathName = usePathname()
 const dispatch = useAppDispatch()
  useEffect(() => {        
    findCategoryById(categoryId)
      .then((category) => {                
        if(category){

          setIsCategory(true) 
          dispatch(categoryReducer(category))
        } 
         else{

           setIsCategory(false);
         }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error");
      });
  }, [categoryId,dispatch]);
  if (isLoading) {
    return <LoadingPulse />;
  }
  return (
    <div >
      {!isCategory ? (
        <div className="card_message">
          There&apos;s no catagory with this name.
          <br />
          <Link
            href={"/box/categories"}
            className="text-blue-500 font-normal hover:underline"
          >
            Choose another category
          </Link>
        </div>
      ) : (
        <div>
          <CategoryOptions />
          <CategoryItems/>
        </div>
      )}
    </div>
  );
}
