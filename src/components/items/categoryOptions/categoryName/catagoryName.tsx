import React from 'react'

export default function CategoryEdit() {
  return (
    <div>
                  <input
            id="inputTitle"
            className="w-full p-1 focus:bg-gray-100 text-xl outline outline-0 transition-all border-none   focus:outline-0 "
            placeholder="Write a title here..."
            autoComplete="off"
            type="text"
            required
            // value={categoryValue}
            // onChange={changeCategoryNameHandler}
          />
          <p className="text-red-500 text-sm pl-4">error</p>
    </div>
  )
}
