import React from 'react'
import { FormValues } from '@/src/types/interface'
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
              value: /^(?!\s*$).{1,100}$/,
              message:'Title must be 1-100 character'
            },
            minLength: {
              value: 1,
              message: 'Input must be 1 - 100 character long'
            },
            maxLength: {
              value: 100,
              message: 'Input must be 1 - 100 characters long'
            }
          })}
        />
        <p className='text-red-500 text-sm pl-4'>{error}</p>
    </div>
  )
}

export default TitleInput