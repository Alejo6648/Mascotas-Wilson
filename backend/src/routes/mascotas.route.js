import { Router } from "express";
import { cargarImage, Getpet, RegisterPet, UpdatePet, SearchPet, DeletePet } from "../controllers/mascotas.controller.js";
import { validarToken } from "../controllers/usuarios.controller.js";

const routeMascotas = Router()

routeMascotas.get('/listar',validarToken, Getpet)
routeMascotas.post('/registrar', validarToken, cargarImage, RegisterPet)
routeMascotas.put('/actualizar/:id', validarToken, cargarImage, UpdatePet)
routeMascotas.get('/buscar/:id',validarToken, SearchPet)
routeMascotas.delete('/eliminar/:id',validarToken, DeletePet)

export default routeMascotas