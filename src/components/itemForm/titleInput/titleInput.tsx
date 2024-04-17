import { FormValues } from '@/src/types/interface'
import React, { useEffect } from 'react'
import { UseFormRegister } from 'react-hook-form'
interface TitleProps {
  register: UseFormRegister<FormValues>,
  error:string | undefined,
}
const TitleInput = ({register, error}:TitleProps) => {

  return (
    <div className="w-full mx-auto my-2">
        <input
          id='inputTitle'
          className="w-full p-1 focus:bg-gray-100 text-xl outline outline-0 transition-all border-none   focus:outline-0 "
          placeholder="Write a title here..."
          autoComplete="off"
          type='text'
          {...register('title',{
            required:'Title is required',
            pattern:{
              value: /^.{3,100}$/,
              message:'Title must be 3-100 character'
            }
          })}
        />
        <p className='text-red-500 text-sm pl-4'>{error}</p>
    </div>
  )
}

export default TitleInput