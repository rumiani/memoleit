import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import TextToSpeechSpeaker from "@/src/components/general/textToSpeech/textToSpeech";
import {
  formDataReducer,
  removeTranslationItemReducer,
} from "@/src/redux/slices/itemStateSlice";
import { capitalize } from "lodash";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";
import { MdOutlineTranslate } from "react-icons/md";

export default function WordOptions({
  translatingItem,
  lookUpHandler,
}: {
  translatingItem: string;
  lookUpHandler: Function;
}) {
  const dispatch = useAppDispatch();
  const { formData } = useAppSelector((state) => state.itemState);

  return (
    <div className="flex flex-row justify-between gap-2 items-center">
      <p className="font-bold w-full overflow-x-auto">
        {capitalize(translatingItem)}
      </p>
      <div className="flex flex-row gap-1">
        <button
          type="button"
          onClick={() =>
            lookUpHandler(translatingItem.replace(/[^a-zA-Z]/g, ""))
          }
          className="icon text-2xl"
        >
          <MdOutlineTranslate />
        </button>
        <TextToSpeechSpeaker text={translatingItem} />
        {translatingItem === formData.title ? (
          <IoMdRemoveCircleOutline
            onClick={() => dispatch(formDataReducer({ title: "" }))}
            className="icon !w-8 text-red-500"
          />
        ) : (
          <IoMdAddCircleOutline
            onClick={() => {
              dispatch(formDataReducer({ title: translatingItem, body: "" }));
            }}
            className="icon !w-8 text-gray-500"
          />
        )}
      </div>
    </div>
  );
}
