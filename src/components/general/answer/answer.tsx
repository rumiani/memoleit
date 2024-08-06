import { ItemTypes } from "@/src/types/interface";

interface AnswerTypes {
  goToNextItem: Function;
  item: ItemTypes;
}
export default function Answer({ goToNextItem, item }: AnswerTypes) {
  return (
    <div>
      <div className="buttons flex justify-around w-full gap-2">
        <button
          onClick={() => goToNextItem(item, false)}
          className="third-element redBtn"
          title="I don't remember"
        >
          Not sure
        </button>
        <button
          onClick={() => goToNextItem(item, true)}
          className="fourth-element greenBtn"
          title="I know it"
        >
          I know
        </button>
      </div>
    </div>
  );
}
