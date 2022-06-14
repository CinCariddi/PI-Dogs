import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/LandingPage.css';

export default function LandingPage() {
    return (
        <div className='landing'>
            <h1 className='ingreso'>Conoce más sobre nosotros:</h1>
            <Link to='/home'>
              <button className='btnIngreso'>Ingresar</button>
            </Link>
        </div>
    )
}