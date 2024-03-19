'use client'

import React from 'react'
import { FaChartBar } from "react-icons/fa";
import { MdNoteAdd } from "react-icons/md";
import { FaFilter } from "react-icons/fa6";
import Link from 'next/link';

export default function ItemsNav() {
  return (
    <div className='flex w-full pb-4 border-b border-gray-300'>
      <Link href={'/progress'}>
        <FaChartBar title='Progress' className='w-6 h-6 mx-4 text-blue-700 cursor-pointer'/>
      </Link>
      <Link href={'/filters'}>
        <FaFilter title='Filters' className='w-6 h-6 mx-4 text-gray-700 cursor-pointer'/>
      </Link>
      <Link href={'/new'}>
        <MdNoteAdd title='New item' className='w-6 h-6 mx-4 text-green-700 cursor-pointer'/>
      </Link>
    </div>
  )
}
