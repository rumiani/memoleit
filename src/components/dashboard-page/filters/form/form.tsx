import React from "react";
import CheckboxInput from "./input/input";
import { useAppSelector } from "@/src/app/hooks";
import { isEmpty } from "lodash";

const Form = () => {
  const { categories } = useAppSelector((state) => state.categoryState);

  return (
    <>
      <form
        method="dialog"
        className="h-full text-lg flex flex-col justify-center p-1 w-full mx-auto max-w-96"
      >
        <p className="text-center w-full my-2">
          Choose your category to review
        </p>
        <div className="h-40 overflow-y-auto bg-gray-200">
          {isEmpty(categories) ? (
            <div className="text-red-500 text-center my-16">No categories.</div>
          ) : (
            categories.map((category, i) => {
              return (
                <div key={i}>
                  <CheckboxInput category={category} />
                </div>
              );
            })
          )}
        </div>
      </form>
    </>
  );
};

export default Form;
