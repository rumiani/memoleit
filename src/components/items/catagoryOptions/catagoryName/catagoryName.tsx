import React from 'react'

export default function CatagoryEdit() {
  return (
    <div>
                  <input
            id="inputTitle"
            className="w-full p-1 focus:bg-gray-100 text-xl outline outline-0 transition-all border-none   focus:outline-0 "
            placeholder="Write a title here..."
            autoComplete="off"
            type="text"
            required
            // value={catagoryValue}
            // onChange={changeCatagoryNameHandler}
          />
          <p className="text-red-500 text-sm pl-4">error</p>
    </div>
  )
}
