import { useEffect, useState } from "react";
import Link from "next/link";
import CategoryOptions from "./categoryOptions/categoryOptions";
import CategoryItems from "./categoryItems/categoryItems";
import { findCategoryById } from "@/src/handlers/findCategoryById";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { categoryReducer } from "@/src/redux/slices/categoryStateSlice";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";
import { categoriesPageUrl } from "@/src/handlers/general/pagesLinks";
import { itemsCategoryIdFilterHandler } from "@/src/handlers/itemsCategoryIdFilterHandler";
import { allItemsReducer } from "@/src/redux/slices/itemStateSlice";

export default function CategoryPage({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}) {
  const { category } = useAppSelector((state) => state.categoryState);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchCategoryItems = async () => {
      try {
        const foundCategory = await findCategoryById(categoryId);
        if (!foundCategory || foundCategory.name !== categoryName) {
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        dispatch(categoryReducer(foundCategory));
        const items = await itemsCategoryIdFilterHandler(foundCategory.id);
        dispatch(allItemsReducer(items));
      } catch (error) {}
    };
    fetchCategoryItems();
  }, [categoryId, dispatch, categoryName]);
  if (isLoading) {
    return <LoadingPulse />;
  }
  return (
    <div>
      {category.id === "" ? (
        <div className="card_message">
          There&apos;s no catagory with this name.
          <br />
          <Link
            href={categoriesPageUrl}
            className="text-blue-500 font-normal hover:underline"
          >
            Choose another category
          </Link>
        </div>
      ) : (
        <div>
          <CategoryOptions />
          <CategoryItems />
        </div>
      )}
    </div>
  );
}
