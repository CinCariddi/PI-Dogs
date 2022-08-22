const { Router } = require("express");
const router = Router();
const {getAllDogs} = require('../control')
const { Dog } = require('../db')


// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado
router.get('/', async (req, res) => {
    try {
        const {name} = req.query;     //traigo la palabra por query
        let allDogs = await getAllDogs();
        if (name) {
            let dogName = await allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
            dogName.length 
            ? res.json(dogName) 
            : res.status(400).send({msg: 'Dog does not exist.'})
        }else {
            res.json(allDogs);
        }
    } catch(error) {
        res.status(400).json({error: 'Error!'})
    }
})



// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados
router.get('/:idRaza', async (req, res) => {
    try{
        const {idRaza} = req.params;
        const allDogs = await getAllDogs();
        if(idRaza) {
            const dog = allDogs.find((d) => String(d.id) === idRaza)
            dog.temperament = dog.temperament.split(',')
            res.json(dog)
        }else if(id.length > 10) {
            const dogByDb = await Dog.findByPk(id)
            res.status(200).send(dogByDb)
        }else {
            res.send(400)
        }
    } catch(error) {
        res.status(400).json({error: 'Error!'})
    }
})


module.exports = router;