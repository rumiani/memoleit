import React from 'react'
import Item from './[id]/page'

export default function Edit({ params }: { params: { id: string } }) {
  return (
    <div>
        <Item params={params}/>
    </div>
  )
}
