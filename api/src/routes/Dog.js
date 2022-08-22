const { Router } = require("express");
const router = Router();
const {getAllDogs} = require('../control')
const { Dog, Temperament } = require('../db')


// Recibe los datos recolectados desde el formulario controlado 
// de la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos
router.post('/', async (req, res) => {
    try {
        let { name, height, weight, life_span, image, temperaments } = req.body;
        const dogCreate = await Dog.create({
            name,
            height,
            weight,
            life_span,
            image,
        })
        if(temperaments.length > 0) {
            for (let i = 0; i < temperaments.length; i++) {
                const associatedTemp = await Temperament.findOrCreate({
                    where: { name: temperaments[i]},
                });
                dogCreate.addTemperament(associatedTemp[0]);
            }
            res.json(dogCreate)
        }
    } catch(error) {
        console.log(error)
    }
})


module.exports = router;