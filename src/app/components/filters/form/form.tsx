import React, { useState } from "react";

const topics = ["11plus", "example", "another one"];
const Form = () => {
  const [selectedCategory, setSelectedCategory] = useState("Technology");
  const [topic, setTopic] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filterBy, setFilterBy] = useState("activity");
  // const [filteredMentors, setFilteredMentors] = useState(mentors);
  const [enoughDes, setEnoughDes] = useState(false);
  console.log("selectedCategory", selectedCategory);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchInput(searchValue);

    // Filter mentors based on the selected filter option and the search input
    const filteredMentors = mentors.filter((mentor) => {
      return mentor[filterBy].toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredMentors(filteredMentors);
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };
  return (
    <form
      method="dialog"
      className="text-lg flex flex-col justify-center p-4 w-full mx-auto max-w-96 h-full "
    >
      <p className="text-center w-full">Choose your items to review:</p>
      <div className="my-8 ">
      {topics.map((topic, i) => {
        return (
          <div
            key={i}
            className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]"
          >
            <div className="flex gap-2">
              <input
                type="checkbox"
                id={topic}
                className="
    relative peer shrink-0 flex justify-center align-middle
    appearance-none w-5 h-5 border-2 border-blue-500 rounded-sm bg-white
    mt-1
    checked:bg-blue-600 checked:border-0"
              />
              <label htmlFor={topic}>{topic}</label>
              <svg
                className="
    absolute 
    w-4 h-4 mt-[6px] ml-[2px]
    hidden peer-checked:block
    pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
        );
      })}
      </div>
      <button
        disabled
        className="disabledBtn rounded-md mx-auto my-4 py-1 px-2 w-24 bg-blue-300 hover:text-white hover:bg-blue-500"
      >
        Apply
      </button>
    </form>
  );
};

export default Form;
