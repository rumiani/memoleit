export default function ItemProgress({
  itemBoxNumber,
}: {
  itemBoxNumber: number;
}) {
  return (
    <div className="w-full flex flex-row gap-2 justify-between cursor-default">
      {
      itemBoxNumber === 6?
      <div className="w-full h-[3px] bg-green-800"></div>
      :[1, 2, 3, 4, 5].map((boxNumber) => (
        <div key={boxNumber} className="w-1/5 flex flex-col justify-end">
          <span
            className={`${
              boxNumber <= itemBoxNumber && "bg-green-800"
            } bg-gray-300  w-full h-[3px] rounded-md`}
          ></span>
        </div>
      ))}
    </div>
  );
}
