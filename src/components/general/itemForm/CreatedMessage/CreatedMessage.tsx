import React from "react";
import Link from "next/link";
import { getCategoriesHandler } from "@/src/handlers/getCategoriesHandler";
import { categoriesReducer } from "@/src/redux/slices/categoryStateSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { capitalize, divide } from "lodash";
import {
  formDataReducer,
  translatingItemsReducer,
} from "@/src/redux/slices/itemStateSlice";

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
      .catch(() => console.log("error"));
    setCreatedMessage();
  };
  return (
    <div>
      {translatingItems.length === 0 ? (
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
        <div className="w-72 flex flex-wrap gap-1">
          {translatingItems.map((translatingItem, i) => {
            return (
              <div
                key={i}
                className="w-fit flex flex-col justify-center items-center bg-gray-100 rounded-md p-2"
              >
                <p>{capitalize(translatingItem)}</p>
                <div className="flex flex-row">
                  <span
                    onClick={() => {
                      dispatch(formDataReducer({ title: translatingItem }));
                      setCreatedMessage(false);
                    }}
                    className="icon text-3xl text-green-600"
                  >
                    +
                  </span>
                  <span
                    onClick={() =>
                      dispatch(
                        translatingItemsReducer(
                          translatingItems.filter(
                            (item) => item !== translatingItem,
                          ),
                        ),
                      )
                    }
                    className="icon text-3xl text-red-500"
                  >
                    -
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CreatedMessage;
