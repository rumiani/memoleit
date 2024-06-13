import { db } from '@/src/services/db'
import React, { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf';
export default function BookPage({id}:{id:string}) {
  const[pdfBlobUrl,setPdfBlobUrl] = useState<any>()
    useEffect(()=>{
db.pdfs.get(id).then(book =>{
  // setPdfBlobUrl(URL.createObjectURL(book?.file))
    console.log();
    
})
    },[id])
  return (
    <div>BookPage

{/* <Document file={pdfBlobUrl}>
        <Page pageNumber={1} />
      </Document> */}
    </div>
  )
}
