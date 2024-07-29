import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { isEmpty } from "lodash";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { MdMoveDown } from "react-icons/md";

export default function ShortResult({
  translatingItem,
  setShowMore,
}: {
  translatingItem: string;
  setShowMore: Function;
}) {
  const dispatch = useAppDispatch();
  const { formData, translatingItems } = useAppSelector(
    (state) => state.itemState,
  );

  return (
    <div className="w-full">
      {!isEmpty(translatingItems[translatingItem]) && (
        <div>
          <div>
            {
              translatingItems[translatingItem][0].meanings[0].definitions[0]
                .definition
            }
          </div>
          <div className="w-full flex flex-row justify-end items-center">
            <MdMoveDown
              title="Move it to the description."
              onClick={() => {
                const meaning =
                  translatingItems[translatingItem][0].meanings[0]
                    .definitions[0].definition;
                dispatch(
                  formDataReducer({
                    title: translatingItem,
                    body: isEmpty(formData.body.trim())
                      ? meaning
                      : formData.body + "\n\n" + meaning,
                  }),
                );
              }}
              className="icon !p-2 hover:scale-110 cursor-pointer"
            />
            <FaChevronDown
              title="See more"
              onClick={() => setShowMore(true)}
              className="icon !p-2 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
