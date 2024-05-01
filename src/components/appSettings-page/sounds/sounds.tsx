import React from 'react'
import TextToSpeech from './textToSpeech/textToSpeech'

export default function Sounds() {

  return (
    <div className='w-full p-4 border border-gray-300'>
        Sounds
        <div>
            <TextToSpeech/>
        </div>
    </div>
  )
}
