import { Router } from "express";
import { Top3Juegos } from "../services/Games.js";
const router = Router();


router.get('/Top3Juegos',Top3Juegos)

// ruta  /Juegostop3
// ruta  /Logs   //todos los datos 
// ruta  /DatosAlmacenados del jugadores agrupados por jugador mongodb 
// ruta  /Ultimo 10 juegos 
// ruta  /Comparaciones  de los worker 
// ruta  


export default router