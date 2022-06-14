import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Card.css'

export default function Card ({name, temperament, weight, image, id}) {
    return (
        <div className='card'>
            <div className='text'>
                <h5 className='hType'>Nombre: {name}</h5>
                <h5 className='hType'>Temperamento: {temperament}</h5>
                <h5 className='hType'>Peso: {weight}</h5>
            </div>
            <Link to={'/home/' + id}>
                <img src={image} alt='img not found' className='imagen'/>
            </Link>
        </div>
    )
}