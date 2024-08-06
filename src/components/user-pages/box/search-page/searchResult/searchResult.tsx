import CategoryItem from "@/src/components/general/categoryitem/categoryitem";
import { ItemTypes } from "@/src/types/interface";

export default function SearchResult({ items }: { items: ItemTypes[] }) {
  return (
    <div>
      {items!.length > 0 ? (
        <div>
          <div className="m-4 w-24">
            Results: <p className="font-bold inline">{items?.length}</p>
          </div>
          <div></div>
          <div className="flex flex-wrap gap-2 my-16">
            {items!.map((item: ItemTypes) => (
              <CategoryItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-center px-4 my-16">
          No items found with this search term.
        </p>
      )}
    </div>
  );
}
