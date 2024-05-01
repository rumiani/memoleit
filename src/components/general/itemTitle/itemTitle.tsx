import React from 'react'
import Speaker from '../speaker/speaker'
import { capitalize } from 'lodash'

export default function ItemTitle({title}:{title:string}) {
  return (
        <div className=" relative my-2 " >
          <span className="absolute">
          <Speaker text={title} />
          </span>
          <h3 id="title" className="text-2xl font-bold  text-center">
            {capitalize(title)}
          </h3>
        </div>
  )
}
