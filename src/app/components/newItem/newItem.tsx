import React from "react";
import CreatedPath from "../form_components/createdPath/createdPath";
import { useSelector } from "react-redux";
import ItemForm from "./itemForm/itemForm";

const NewItem = () => {
  const { item } = useSelector((state) => state.appState);
  const defaultValues = {
    title: '',
    html: '',
    text: '',
    tags: {
      array: '',
      tag: '',
    },
  }
  return (
    <>{item.url ? <CreatedPath/> : <ItemForm defaultValues={defaultValues}/> }</>
  );
};

export default NewItem;
