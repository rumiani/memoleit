'use client'
import { useAppDispatch } from "@/src/app/hooks";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { userReducer } from "@/src/redux/appStateSlice";
import React, { useEffect, useRef, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import deleteCategoryHandler from "@/src/handlers/deleteCategoryHandler";
type DialogElement = HTMLDialogElement | null;

export default function CategoryDelete({ category }: { category: string }) {
  const router = useRouter()
  const [inputValue, setInputValue] = useState<string>('');

  const dialogElement = useRef(null);
  const dispatch = useAppDispatch();

  const deleteHadndler = () => {
    (dialogElement.current as DialogElement)?.showModal();
    const { categories } = getAppDataHandler();
    dispatch(userReducer({ categories }));
  };
  useEffect(() => {
    onclick = (event) => {
      if (event.target === dialogElement.current!) {
        (dialogElement.current as DialogElement)?.close();
      }
    };
  }, []);

  const changeInputHandler = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue === category);
    
  };
  const deleteCategory = () =>{
    (dialogElement.current as DialogElement)?.close();
    const result = deleteCategoryHandler(category)
    console.log(result);
    
    if(result){
      toast.success(category+'category was successfully deleted.',{autoClose:2000})
      toast.info('You are being redirected to categories page.',{autoClose:2000})
      setTimeout(() => {
        // router.push('/categories')
      }, 3000);
    }else{
      toast.error('Item was not found')
    }
    
  }
  return (
    <div>
      <button onClick={deleteHadndler} className="icon text-red-500 text-2xl !p-2 !w-fit">
        <RiDeleteBin6Fill />
      </button>
      <dialog
        ref={dialogElement}
        className="bg-gray-300 cursor-default rounded-md w-full sm:w-96"
      >
        <div className="bg-red-100 p-4 w-full h-full">
          Please write down <strong>{category}</strong> then click on the delete
          button.
          <input
            id="inputTitle"
            className="w-full m-2 p-1 focus:bg-gray-100 text-xl outline outline-0 transition-all border-none   focus:outline-0 "
            placeholder="..."
            autoComplete="off"
            type="text"
            required
            value={inputValue}
            onChange={changeInputHandler}
          />
          <button disabled={ inputValue !== category} onClick={() => deleteCategory()} className="icon !px-2 disabled:bg-gray-400 bg-red-400 !w-fit">Delete</button>
        </div>
      </dialog>
    </div>
  );
}
