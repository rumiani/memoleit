export default function ItemProgress({
  itemBoxNumber,
}: {
  itemBoxNumber: number;
}) {
  return (
    <div
      title={
        itemBoxNumber < 6
          ? `The item is in the box ${itemBoxNumber}`
          : "Item is archived"
      }
      className="w-full flex flex-row gap-1 justify-between cursor-default"
    >
      {[1, 2, 3, 4, 5, 6].map((boxNumber) => (
        <div key={boxNumber} className="w-1/5 flex flex-col justify-end">
          <span
            className={`${
              (itemBoxNumber > 5 || boxNumber <= itemBoxNumber) &&
              "bg-green-800"
            } bg-gray-300  w-full h-[2px] rounded-md`}
          ></span>
        </div>
      ))}
    </div>
  );
}
