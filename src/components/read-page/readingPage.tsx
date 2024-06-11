import React from 'react'
// pages/index.tsx
import { useState } from 'react';
import { PdfTypes } from '@/src/types/interface';
import { addPdfFile, getAllPdfFiles, getPdfFileById  } from './handlers/pdfService';

export default function ReadingPage () {
  const [pdfName, setPdfName] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfList, setPdfList] = useState<PdfTypes[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setPdfFile(files[0]);
    }
  };

  const handleAddPdf = async () => {
    if (pdfFile && pdfName) {
      await addPdfFile(pdfName, pdfFile);
      const files = await getAllPdfFiles();
      setPdfList(files);
      setPdfName('');
      setPdfFile(null);
    }
  };

  const fetchAllPdfs = async () => {
    const files = await getAllPdfFiles();
    console.log(files);
    
    setPdfList(files);
  };

  return (
    <div className='p-4'>
      <h1 className='font-bold'>Add PDF File</h1>
      <input
        type="text"
        value={pdfName}
        onChange={(e) => setPdfName(e.target.value)}
        placeholder="PDF Name"
      />
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleAddPdf}>Add PDF</button>

      <h2>PDF List</h2>
      <button onClick={fetchAllPdfs}>Refresh List</button>
      <ul>
        {pdfList.map((pdf) => (
          <li key={pdf.id}>{pdf.name}</li>
        ))}
      </ul>
    </div>
  );
};
