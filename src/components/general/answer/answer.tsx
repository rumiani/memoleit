import { ItemTypes } from '@/src/types/interface'
import React from 'react'
interface AnswerTypes {
    goToNextItem:Function,
    item:ItemTypes
}
export default function Answer({goToNextItem,item}:AnswerTypes) {
  return (
    <div>
        <div className="buttons flex justify-around w-full gap-2">
          <button
            onClick={() => goToNextItem(item, false)}
            className="third-element primaryBtn !px-0 !w-42 !bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            I don&apos;t know
          </button>
          <button
            onClick={() => goToNextItem(item, true)}
            className="fourth-element primaryBtn !bg-green-500  disabled:cursor-not-allowed disabled:opacity-50"
          >
            I know
          </button>
        </div>
      </div>
  )
}
