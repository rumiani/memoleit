import React from 'react'

export default function ItemProgress({itemBoxNumber}:{itemBoxNumber:number}) {
    const boxes = [0,1,2,3,4,5]
  return (
    <div className='w-full flex flex-row'>
        {boxes.map( boxNumber =>{
            console.log(itemBoxNumber === itemBoxNumber, );
            
            return (
                <div key={boxNumber} >
                    {boxNumber === itemBoxNumber && <span>Here</span>}
                    {boxNumber}
                </div>
            )
        })
        }
    </div>
  )
}
