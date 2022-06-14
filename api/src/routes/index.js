const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const dog = require('./Dog.js')
const dogs = require('./Dogs.js')
const temperament = require("./Temperament.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogs);
router.use("/dog", dog);
router.use("/temperament", temperament);
module.exports = router;


