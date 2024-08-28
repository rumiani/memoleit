import { FaChevronUp } from "react-icons/fa";
import Meanings from "./meanings/meanings";
import { useAppSelector } from "@/src/app/hooks";

export default function LongResults({
  setShowMore,
  translatingItem,
}: {
  setShowMore: Function;
  translatingItem: string;
}) {
  const { translatingItems } = useAppSelector((state) => state.itemState);
  return (
    <ul className="w-full relative">
      <FaChevronUp
        title="See less"
        onClick={() => setShowMore(false)}
        className="absolute right-0 icon !p-2 cursor-pointer"
      />
      {translatingItems[translatingItem].map((result, i) => (
        <ul key={i} className="flex flex-row gap-2 justify-between w-full mt-8">
          <Meanings translatingItem={translatingItem} result={result} />
        </ul>
      ))}
    </ul>
  );
}
