import { Router } from "express";
const router = Router();

import {holaMundo} from '../services/tests.js'

router.get('/hola', holaMundo)
// ruta  /Juegostop3
// ruta  /Logs   //todos los datos 
// ruta  /DatosAlmacenados del jugadores agrupados por jugador mongodb 
// ruta  /Ultimo 10 juegos 
// ruta  /Comparaciones  de los worker 
// ruta  


export default router