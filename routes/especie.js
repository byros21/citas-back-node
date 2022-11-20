
const { Router } = require('express');
const { getEspecie, setEspecie, deleteEspecie } = require('../controllers/especie.controller');

const router = Router();

router.get("/list", getEspecie);

router.get("/:id", getEspecie);

router.post("/", setEspecie);

router.put("/", setEspecie);

router.delete("/:id", deleteEspecie);

module.exports = router;