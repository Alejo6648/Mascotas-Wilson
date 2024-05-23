import { Router } from "express";
import { Register, validate } from "../controllers/usuarios.controller.js";

const routeUser = Router()

routeUser.post('/validar', validate)
routeUser.post('/registrar', Register)

export default routeUser