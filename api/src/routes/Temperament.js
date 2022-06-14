const { Router } = require("express");
const router = Router();
const { Temperament } = require('../db')
const axios = require("axios");
const {API_KEY} = process.env
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;


// Obtener todos los temperamentos posibles
// En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y 
// luego ya utilizarlos desde allí

router.get('/', async (req, res) => {
    const apiTemperament = await axios.get(URL); // traigo los temperamentos de la api
    try {
        let allTemperament = apiTemperament.data     // los guardo en una variable
        .map(t => (t.temperament ? t.temperament : 'Data does not exist')) 
        .map(e => e?.split(', '))                            // como los temperamentos estan escrito de forma string, los separa y convierte en array
        let temp = [...new Set(allTemperament.flat())]  // crea nuevo arreglo con todos los elementos del array (sin repetir)
        temp.forEach(d => {                             // busca temperamentos y si no los encuentra, los crea
            Temperament.findOrCreate({
                where: {
                    name: d
                }
            })
        })
    
        temp = await Temperament.findAll();
        res.json(temp)
    }catch(error) {
        console.log(error)
        res.status(404).json({error: 'Error!'})
    }
})

module.exports = router;