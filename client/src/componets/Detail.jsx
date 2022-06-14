import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDetail } from "../actions";
import { Link } from "react-router-dom";
import '../CSS/Detail.css'


export default function Detail () {
    const dispatch = useDispatch();
    const {id} = useParams()

    const myDog = useSelector((state) => state.detail)

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    return (
        <div className="det">
            <Link className="boton3" to='/home'>Volver</Link>
            {
                myDog? (
                <div className="dt">
                    <h4 className="titulo">Detalles sobre:</h4>
                    <img src={myDog.image} alt='img not found' className='img'/>
                    <ul className="list">
                        <li>Nombre: {myDog.name}</li>
                        <li>Altura: {myDog.height}</li>
                        <li>Peso: {myDog.weight}</li>
                        <li>Espectativa de vida: {myDog.life_span}</li>
                        <li>Temperamento: {myDog.temperament}</li>
                    </ul>
                </div>
                ): (<h2>ERROR</h2>)
            }
        </div>
    )
}