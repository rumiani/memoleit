import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

const SearchInput = ({ onSearch }: { onSearch: Function }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    
    if(searchTerm.length < 1) {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        return toast.warning('Input is empty')
    }
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex flex-row justify-around gap-2 w-full max-w-lg h-10">
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={handleChange}
        ref={inputRef}
        className="px-2 w-4/5 max-w-5xl"
      />
      <button type="submit" className="primaryBtn !w-fit !px-2">Search</button>
    </form>
  );
};

export default SearchInput;
