import { useAppDispatch } from "@/src/app/hooks";
import { boxItemsFilterHandler } from "@/src/handlers/boxItemsFilterHandler";
import { allItemsReducer } from "@/src/redux/slices/itemStateSlice";

interface BoxType {
  number: number;
}
const boxes: BoxType[] = [
  { number: 1 },
  { number: 2 },
  { number: 3 },
  { number: 4 },
  { number: 5 },
  { number: 6 },
];

export default function BoxesDropdown({ categoryId }: { categoryId: string }) {
  const dispatch = useAppDispatch();

  const dropdownChangeHnadler = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    try {
      const boxNumber = +event.target.value;
      const filteredItemsData = await boxItemsFilterHandler(
        categoryId,
        boxNumber,
      );
      dispatch(allItemsReducer(filteredItemsData!));
    } catch (error) {}
  };
  return (
    <div className="w-32 flex flex-col justify-center items-start mb-4">
      <select
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
        onChange={dropdownChangeHnadler}
      >
        <option value={undefined}>All</option>
        {boxes.map((box: BoxType) => (
          <option key={box.number} value={box.number}>
            {box.number === 6 ? "Learned" : "Box " + box.number}
          </option>
        ))}
      </select>
    </div>
  );
}
