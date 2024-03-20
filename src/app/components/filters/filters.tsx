import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import Form from './form/form';
import { FaFilter } from 'react-icons/fa';

const Filters = () => {
    const dialogElement = useRef(null);

    const showModalHnadler = () => {
        dialogElement.current!.showModal();
    };

    useEffect(() => {
        onclick = (event) => {
            if (event.target === dialogElement.current!) {
                dialogElement.current!.close();
            }
        };
    }, []);

  return (
    <div className=''>
        <button onClick={showModalHnadler} className='bg-white flex flex-row w-24 h-14 text-center align-middle justify-between rounded-md py-1 px-2'>
            <FaFilter className='icon'/>
        </button>
        <dialog ref={dialogElement} className='rounded-md w-full sm:w-96 h-80'>
            <Form/>
        </dialog>
    </div>
  )
}

export default Filters