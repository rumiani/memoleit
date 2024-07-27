import { useRouter } from "next/navigation";
import React from "react";

const SearchInput = ({ searchTerm }: { searchTerm: string }) => {
  const router = useRouter();
  return (
    <input
      type="text"
      placeholder="Search items..."
      value={searchTerm}
      onChange={(e) =>
        router.push(`/user/box/search/?q=${e.currentTarget.value}`)
      }
      className="mx-auto p-2 w-4/5 max-w-xl border-b border-gray-200"
    />
  );
};

export default SearchInput;
