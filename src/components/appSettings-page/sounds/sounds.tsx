import React from 'react'
import TextToSpeech from './textToSpeech/textToSpeech'
import ReviewSounds from './reviewSounds/reviewSounds'

export default function Sounds() {

  return (
    <div className=''>
        Sounds
        <div>
            <TextToSpeech/>
            <ReviewSounds/>
        </div>
    </div>
  )
}
