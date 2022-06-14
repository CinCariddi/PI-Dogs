import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDogs } from '../actions/index';
import '../CSS/DogCreate.css'


function validate(input, oldErrors){
    let errors = oldErrors;
    if (input.temperament.length < 1){
        errors.temperament = 'Se requieren al menos un Temperamento';
    } else {
        errors.temperament = '';
    }
    if (input.weightMin > input.weightMax || input.weightMax < input.weightMin || input.weightMin <= 0 || input.weightMax <= 0 || input.weightMin === input.weightMax){
        if(input.weightMin > input.weightMax){
            errors.weightMin = 'El peso mínimo debe ser menor al máximo';
        }
        if(input.weightMax < input.weightMin){
            errors.weightMax = 'El peso máximo debe ser mayor al mínimo';
        }
        if(input.weightMin <= 0){
            errors.weightMin = 'El peso mínimo debe ser mayor a 0';
        }
        if(input.weightMax <= 0){
            errors.weightMax = 'El peso máximo debe ser mayor a 0';
        }
        if(input.weightMin === input.weightMax){
            errors.weightMin = 'Los pesos deben ser diferentes';
        }
    } else {
        errors.weightMin = '';
        errors.weightMax = '';
    }
    if (input.heightMin > input.heightMax || input.heightMax < input.heightMin || input.heightMin <= 0 || input.heightMax <= 0 || input.heightMin === input.heightMax){
        if(input.heightMin > input.heightMax){
            errors.heightMin = 'La altura mínima debe ser menor a la máxima';
        }
        if(input.heightMax < input.heightMin){
            errors.heightMax = 'La altura máxima debe ser mayor a la mínima';
        }
        if(input.heightMin <= 0){
            errors.heightMin = 'La altura mínima debe ser mayor a 0';
        }
        if(input.heightMax <= 0){
            errors.heightMax = 'La altura máxima debe ser mayor a 0';
        }
        if(input.heightMin === input.heightMax){
            errors.heightMin = 'Las alturas deben ser diferentes';
        }
    } else {
        errors.heightMin = '';
        errors.heightMax = '';
    }
    return errors
}

export default function DogCreate () {
    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({ temperament: '', weightMin: '', weightMax:'', heightMin: '', heightMax: ''})

    const [input, setInput] = useState({
        name:'',
        heightMin: '',
        heightMax: '',
        weightMin:'',
        weightMax:'',
        image:'',
        life_span: '',
        temperaments: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }, errors))
    }

    function handleDelete(e) {
        setInput({
            ...input,
            temperament: input.temperaments.filter(temp =>temp !== e)
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperaments, e.target.value]
        })
    }



    function handleSubmit(e) {
        e.preventDefault()
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }, errors))
        if (errors.temperament === '' && errors.weightMin === '' && errors.weightMax === '' && errors.heightMin === '' && errors.heightMax === '') {
            const newInput = {
                name: input.name,
                temperaments: input.temperaments.join(', '),
                weight: input.weightMin + ' - ' + input.weightMax,
                height: input.heightMin + ' - ' + input.heightMax,
                life_span: input.life_span,
                image: input.image
            }
            dispatch(postDogs(newInput))
            alert('Perro Creado')
            setInput({
                name:'',
                heightMin: '',
                heightMax: '',
                weightMin:'',
                weightMax:'',
                image:'',
                life_span: '',
                temperaments: []
            })
        } else {
            alert('Faltan datos')
        }
    }

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])
    

    return (
        <div className="div2">
            <Link className="boton3" to='/home'>Volver</Link>
            <div className="inputForm">
            <h1 className="texto">Crear tu perro</h1>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className="formulario">
                <div className="inputForm">
                    <label>Nombre:</label>
                    <input
                    type= "text"
                    value = {input.name}
                    name = "name"
                    onChange ={handleChange}
                    className="click"
                    />
                </div>
                <div className="inputForm">
                    <label>Peso Minimo:</label>
                    <input
                    type= "text"
                    value = {input.weightMin}
                    name = "weightMin"
                    onChange ={handleChange}
                    className="click"
                    />
                    {
                        errors.weightMin !== ''
                            ?<p className="error">{errors.weightMin}</p>
                            :null
                    }
                </div>
                <div className="inputForm">
                    <label>Peso Maximo:</label>
                    <input
                    type= "text"
                    value = {input.weightMax}
                    name = "weightMax"
                    onChange ={handleChange}
                    className="click"
                    />
                    {
                        errors.weightMax !== ''
                            ?<p className="error">{errors.weightMax}</p>
                            :null
                    }
                </div>
                <div className="inputForm">
                    <label>Altura Minima:</label>
                    <input
                    type= "text"
                    value = {input.heightMin}
                    name = "heightMin"
                    onChange ={handleChange}
                    className="click"
                    />
                    {
                        errors.heightMin !== ''
                            ?<p className="error">{errors.heightMin}</p>
                            :null
                    }
                </div>
                <div className="inputForm">
                    <label>Altura Maxima:</label>
                    <input
                    type= "text"
                    value = {input.heightMax}
                    name = "heightMax"
                    onChange ={handleChange}
                    className="click"
                    />
                    {
                        errors.heightMax !== ''
                            ?<p className="error">{errors.heightMax}</p>
                            :null
                    }
                </div>
                <div className="inputForm">
                    <label>Expectativa de vida:</label>
                    <input
                    type= "text"
                    value = {input.life_span}
                    name = "life_span"
                    onChange ={handleChange}
                    className="click"
                    />
                </div>
                <div className="inputForm">
                    <label>Imagen:</label>
                    <input
                    type= "text"
                    value = {input.image}
                    name = "image"
                    onChange ={handleChange}
                    className="click"
                    />
                </div>
                <div className="inputForm">

                    <label>Temperamento:</label>
                    <select onChange={(e)=> handleSelect(e)} className="click">
                    {temperaments.length > 0 && temperaments.map((temp) => (
                        <option value = {temp.name} key={`${temp.id}${temp.name}`}>{temp.name}</option>
                        ))}
                </select>
                <ul>
                    { input.temperaments.length > 0 && input.temperaments.map((e, index) => (
                        <div className="temp" key={`${e}${index}`}>
                            <div className="x">
                                <button type="button" className="botonx" onClick={() => handleDelete(e)}>X</button>
                            </div>
                            {e}
                        </div>
                    ))}
                </ul>
                </div>
                <div className="inputForm">
                    <button type='submit' className="boton2">Crear Perro</button>
                </div>
            </form>
        </div>
    )
}