import { capitalize } from "lodash";
import { useAppSelector } from "@/src/app/hooks";
import { ItemTypes } from "@/src/types/interface";
import TextToSpeechSpeaker from "../../textToSpeech/textToSpeech";

export default function ItemTitle({ item }: { item: ItemTypes }) {
  const { isTextToSpeechOn } = useAppSelector((state) => state.settingState);
  return (
    <div className="flex flex-row items-center relative mt-4">
      {isTextToSpeechOn && (
        <span className="absolute left-0 second-element">
          <TextToSpeechSpeaker text={item.title} />
        </span>
      )}
      <h3 id="title" className="text-xl w-2/3 font-bold mx-auto text-center">
        {capitalize(item.title)}
      </h3>
    </div>
  );
}
