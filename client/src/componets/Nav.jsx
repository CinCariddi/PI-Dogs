import React from 'react';
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom';
import '../CSS/Nav.css'


export default function Nav() {
  return (
    <div className="navbar">
      <SearchBar/>
      <Link to= '/dog' className='boton'>Crear Perro</Link>
    </div>
  );
};