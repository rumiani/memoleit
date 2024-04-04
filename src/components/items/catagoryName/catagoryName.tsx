import React, { useState } from 'react'
import { GoGear } from "react-icons/go";
export default function CatagoryName({catagory}:{catagory:string}) {
    const [catagoryValue, setCatagoryValue] = useState<string>(catagory);
    const [readOnly, setReadOnly] = useState<boolean>(true);
    const changeCatagoryNameHandler = (e) => {
        setCatagoryValue(e.target.value);
        console.log(catagoryValue);
      };
      const saveCatagoryHandler = () =>{
        console.log(readOnly);
        
        if(readOnly){
            console.log('editable');
            
        }else{
            console.log('not');

        }
        setReadOnly(!readOnly)
      }
  return (
    <div>
        <h2 className="flex flex-row justify-between border-b border-gray-200">
            <input
              readOnly={readOnly}
              type="text"
              value={catagoryValue}
              onChange={changeCatagoryNameHandler}
              
              className={`${readOnly?'outline:none':''} `}
            />
            <GoGear/>
            {readOnly ? (
              <button onClick={saveCatagoryHandler} className='icon !p-1 text-yellow-600'>Edit</button>
            ) : (
              <button onClick={saveCatagoryHandler} className='icon !p-1 text-green-600'>Save</button>
            )}
          </h2>
    </div>
  )
}
