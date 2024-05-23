import { Router } from "express";
import { GetCategories, GetGender, GetRace, GetUsers } from "../controllers/opciones.controller.js";

const routeOpciones = Router()

routeOpciones.get('/categorias', GetCategories)
routeOpciones.get('/genero', GetGender)
routeOpciones.get('/razas', GetRace)
routeOpciones.get('/users', GetUsers)

export default routeOpciones