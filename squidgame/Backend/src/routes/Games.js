import { Router } from "express";
import { MostrarDatos, Top3Juegos ,Ultimo10_Juegos,MostrarInsersion,AgruparJugadores} from "../services/Games.js";

const router = Router();

// ruta  Juegostop3
router.get('/Top3Juegos', Top3Juegos)
// comparar los tres workers
router.get('/MostrarInsersion', MostrarInsersion)
// ruta  /Ultimo 10 juegos 
router.get('/Ultimo10_Juegos', Ultimo10_Juegos)
// ruta  /Logs   //todos los datos 
router.get('/MostrarDatos', MostrarDatos)
// ruta  /DatosAlmacenados del jugadores agrupados por jugador mongodb 
router.get('/AgruparJugadores', AgruparJugadores)




export default router