import React, { useState } from "react";

let typingTimeout: ReturnType<typeof setTimeout>;
const SearchInput = ({ onSearch }: { onSearch: Function }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") return;
    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      if (event.target.value !== "") onSearch(event.target.value);
    }, 500);
  };

  return (
    <input
      type="text"
      placeholder="Search items..."
      value={searchTerm}
      onChange={handleChange}
      className="mx-auto p-2 w-4/5 max-w-5xl border-b border-gray-200"
    />
  );
};

export default SearchInput;
