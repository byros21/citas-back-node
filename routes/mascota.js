
const { Router } = require('express');
const { getMascota, setMascota, deleteMascota } = require('../controllers/mascota.controller');

const router = Router();

router.get("/list", getMascota);

router.get("/:id", getMascota);

router.post("/", setMascota);

router.put("/", setMascota);

router.delete("/:id", deleteMascota);

module.exports = router;