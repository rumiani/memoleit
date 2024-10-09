import Link from "next/link";
import { getCategoriesHandler } from "@/src/handlers/getCategoriesHandler";
import { categoriesReducer } from "@/src/redux/slices/categoryStateSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import TranslatingItems from "./translatingItems/translatingItems";

const CreatedMessage = ({
  setCreatedMessage,
}: {
  setCreatedMessage: Function;
}) => {
  const { translatingItems } = useAppSelector((state) => state.itemState);
  const dispatch = useAppDispatch();

  const newItemHandler = () => {
    getCategoriesHandler()
      .then((existedCategories) => {
        if (existedCategories) dispatch(categoriesReducer(existedCategories));
      })
      .catch(() => {});
    setCreatedMessage();
  };
  return (
    <div>
      {Object.keys(translatingItems).length === 0 ? (
        <div className="flex flex-row justify-center items-center gap-2 mx-auto my-12">
          <Link
            href="/user/box/categories"
            className="text-blue-500 hover:underline"
          >
            <button className="primaryBtn !w-40">Categories</button>
          </Link>
          <button className="primaryBtn !w-40" onClick={() => newItemHandler()}>
            New item
          </button>
        </div>
      ) : (
        <TranslatingItems setCreatedMessage={setCreatedMessage} />
      )}
    </div>
  );
};

export default CreatedMessage;
