import { categoryTypes } from '@/src/types/interface'
import Link from 'next/link'
import React from 'react'
import CategoryInput from './CategoryInput/CategoryInput'

export default function CategoryName({category}:{category:categoryTypes}) {
  return (
    <div className="my-8">
        <Link
          href={"/categories/" + category.name}
          title="Open for more details"
          className="text-blue-500 my-4 text-xl hover:underline"
        >
          <h3 className="w-fit mx-auto text-center">{category.name}</h3>
        </Link>
        <CategoryInput category={category}/>
        {/* <button
          onClick={saveCategoryHandler}
          className="icon !p-2 text-xl !w-fit"
          title="Filter categories"
        >
          <FaSave className="text-3xl text-green-600" />
        </button> */}
      </div>
  )
}
