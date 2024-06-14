'use client'
import BookPage from '@/src/components/dashboard-super-page/docs-page/book-page/bookPage'
import React from 'react'

export default function Page({params}:{params:{id:string}}) {
  return (
    <div >
        <BookPage id={params.id}/>
    </div>
  )
}
