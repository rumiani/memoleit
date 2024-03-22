import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false });

const toolbar = {
  options: ['inline', 'blockType','list', 'textAlign', 'colorPicker', 'link', 'embedded', 'image'],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
    },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['unordered', 'ordered'],
   },
  textAlign: {
    inDropdown: true,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['left', 'center', 'right', 'justify'],
   },
  link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    options: ['link'],
   linkCallback: undefined
  },
  embedded: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    embedCallback: undefined,
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },
  image: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: undefined,
    previewImage: false,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },
}
const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
useEffect(()=>{
  console.log(editorState);
  
},[editorState])
  const onEditorStateChange = (editorState) => {
    console.log(editorState);
    
    setEditorState(editorState);
  };

  const onSave = () => {
    const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    console.log(content);    
  };

  return (
    <div>
      <Editor
      // toolbarOnFocus
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={toolbar}
      />
      <button onClick={onSave}>Save</button>
    </div>
     );
    };
    
    export default RichTextEditor;