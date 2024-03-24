import React, { useEffect } from 'react'
import ItemForm from '../../itemForm/itemForm'
import { getAppDataHandler } from '@/src/handlers/getAppDataHandler'
import { itemTypes } from '@/src/types/interface'
import { toast } from 'react-toastify'
import { Router } from 'next/router'

export default function Edit() {

  return (
    <div>
      <ItemForm item={item}/>
    </div>
  )
}
