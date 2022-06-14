import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDog, filterByCreated, orderByName, filterDogsByTemperament, orderByWeight, getTemperaments } from '../actions';
import Card from './Card';
import Nav from './Nav';
import Paginado from './Pagination';
import '../CSS/Home.css'

export default function Home () {
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)   //es igual al map state to props
    const allTemp =useSelector((state) => state.temperaments)
    const [/*orden*/, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [dogPerPage, /*setDogPerPage*/] = useState(8);
    const indexLastDog = currentPage * dogPerPage;
    const indexFirstDog = indexLastDog - dogPerPage;
    const currentDog = allDogs.slice(indexFirstDog, indexLastDog)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    //nos traemos del estado cuando el componente se arma
    useEffect (() => {
      dispatch(getDog())
      dispatch(getTemperaments())  
    }, [dispatch]
    )

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setOrden(`${e.target.value}`)
    }

    function handleSort2(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setOrden(`${e.target.value}`)
    }

    function handleFilterTemperament(d) {
        dispatch(filterDogsByTemperament(d.target.value))
        setCurrentPage(1);
    }

    function handleFilterCreated(t) {
        dispatch(filterByCreated(t.target.value))
        setCurrentPage(1);
    }
    return (
        <div className='div'>
            <div>
                <Nav/>
            </div>
            <div>
                <div className="orden">
                    <select onChange={e => handleSort(e)}>

                        <option value = 'ascPeso'>Peso ↑</option>
                        <option value = 'desPeso'>Peso ↓</option>
                    </select>
                    <select onChange={e => handleSort2(e)}>
                        <option value = 'asc'>A - Z ↑</option>
                        <option value = 'desc'>Z - A ↓</option>
                    </select>
                    <select onChange={t => handleFilterCreated(t)}>
                        <option value="All">Todos</option>
                        <option value="api">Existentes</option>
                        <option value="created">Creados</option>
                    </select>
                    <select onChange={d => handleFilterTemperament(d)}>
                        <option value = 'All'>Temperamento</option>
                        {
                            allTemp.map(e => (
                                <option key={`${e.name}temp`}>{e.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='dog'>
                {
                    currentDog.length > 0 && currentDog.map(d => (
                        <div key={`${d.id}currentDogs`}>
                            <Card name={d?.name} temperament={d?.temperament} weight={d?.weight} image={d?.image} id={d?.id}/>
                        </div>
                        ))
                }
                </div>

                <Paginado
                    dogPerPage = {dogPerPage}
                    allDogs = {allDogs.length}
                    paginado = {paginado}
                />
            </div>
        </div>
    )
}