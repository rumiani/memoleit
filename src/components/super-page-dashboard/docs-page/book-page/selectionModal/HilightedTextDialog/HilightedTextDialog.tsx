import React from 'react'
import AddToLeitner from './addToLeitner/addToLeitner';
import Dictionary from './dictionary/dictionary';
export default function HilightedTextDialog() {
  return (
    <div className='flex flex-col gap-4 p-4 h-96 overflow-y-scroll'>
      <p>Highlighted Text:</p>
      <Dictionary/>
      <AddToLeitner/>
    </div>
  )
}
