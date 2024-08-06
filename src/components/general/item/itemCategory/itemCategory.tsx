import { getCategoryUrl } from "@/src/handlers/getUrls/getCategoryUrl";
import { ItemTypes } from "@/src/types/interface";
import { capitalize } from "lodash";
import Link from "next/link";

export default function ItemCategory({ item }: { item: ItemTypes }) {
  return (
    <Link
      href={getCategoryUrl(item.categoryId, item.category)}
      title={"category: " + capitalize(item.category)}
      className="text-blue-700 hover:text-blue-400 text-md font-bold pt-3"
    >
      <h2>{capitalize(item.category)}</h2>
    </Link>
  );
}
