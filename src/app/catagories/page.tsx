'use client'
import React, { useEffect } from 'react'
import { useAppSelector } from '../hooks'
import { getAppDataHandler } from '@/src/handlers/getAppDataHandler'
import { getCatagoriesDataHandler } from '@/src/handlers/getCatagoriesDataHandler'

export default function Catagories() {
    const {items} = useAppSelector(state => state.appState)
    useEffect(()=>{
        const {itemsData, Catagories} = getAppDataHandler()
        const catagoriesData = getCatagoriesDataHandler(itemsData, Catagories)
        console.log(catagoriesData);
        
    })
  return (
    <div>Catagories</div>
  )
}
