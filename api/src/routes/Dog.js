const { Router } = require("express");
const router = Router();
const {getAllDogs} = require('../control')
const { Dog, Temperament } = require('../db')


// Recibe los datos recolectados desde el formulario controlado 
// de la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos
router.post('/', async (req, res) => {
    const {name, height, weight, life_span, creareDb, image, temperaments} = req.body;
    try {
        const dogCreate = await Dog.create({
            name: name,
            height: height,
            weight: weight,
            life_span: life_span,
            creareDb: creareDb,
            image: image,
        })

        let associatedTemp = await Temperament.findAll({
            where: { name: temperaments},
        })
        dogCreate.addTemperament(associatedTemp);
        res.json(dogCreate)
    }catch(error) {
        res.status(400).json({error: error})
    }
})

module.exports = router;