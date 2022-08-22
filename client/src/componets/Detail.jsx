import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDetail, clearDetail } from "../actions";
import { Link } from "react-router-dom";
import '../CSS/Detail.css'


export default function Detail () {
    const dispatch = useDispatch();
    const {id} = useParams()

    const myDog = useSelector((state) => state.detail)
    console.log(myDog)
    const [isLoading, setIsloading] = useState(false)

    useEffect(() => {
        setIsloading(true)
        dispatch(getDetail(id))
        return dispatch(clearDetail())
    }, [dispatch, id])


    useEffect(() => {
        if(myDog) setIsloading(false)
    }, [JSON.stringify(myDog)])


    return (
        <div className="det">
            <Link className="boton3" to='/home'>Volver</Link>
            {
                !isLoading && myDog? (
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
                )
                :  <img src="https://www.petsmart.com/on/demandware.static/Sites-PetSmart-Site/-/default/dw5611f25a/images/dog_loader_250x250.gif" alt="Loading"/>
            }
        </div>
    )
}