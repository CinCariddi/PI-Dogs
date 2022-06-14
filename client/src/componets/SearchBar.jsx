import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../actions";
import '../CSS/SearchBar.css'

export default function SearchBar() {
  const dispatch = useDispatch()
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault()
    setName(e.target.value)
    console.log(name)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getNameDogs(name))
  }

  return (
    <div className='boton'>
      <input
        type="text"
        placeholder="Buscar..."
        onChange={e => handleInputChange(e)}
        className='texto'
      />
      <button type="submit" onClick={(e) => handleSubmit(e)} className='click2' >Buscar</button>
    </div>
  );
}