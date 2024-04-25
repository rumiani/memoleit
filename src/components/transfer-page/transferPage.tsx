import React from 'react'
import ExportComponent from './export/export'
import ImportComponent from './import.tsx/import'

export default function TransferPage() {
  return (
    <div className='flex flex-col gap-8 justify-center'>
        <ExportComponent/>
        <ImportComponent/>
    </div>
  )
}
