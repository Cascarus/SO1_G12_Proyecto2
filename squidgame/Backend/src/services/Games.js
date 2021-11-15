import Logs from '../models/logs.js'
import players  from '../models/players.js'
export const Top3Juegos = async (req, res) => {

    /*const datos = await Logs.aggregate().
        group({ _id: "$gamename", Count: { $count: {} } }).
        sort({ Count: -1 }).limit(3);
    */

    const datos = await Logs.aggregate().
        group({ _id: "$gamename", Count: { $sum: 1 } }).
        sort({ Count: -1 }).
        limit(3)


    res.status(200).send(datos);
}


export const MostrarInsersion = async (req, res) => {
    const datos = await Logs.aggregate().
    group({ _id: "$worker", Count: { $sum: 1 } })
    res.status(200).send(datos);
}

export const Ultimo10_Juegos = async (req, res) => {
    const datos = await Logs.find().
    limit(10)
    res.status(200).send(datos);
}

export const MostrarDatos = async (req, res) => {
    const datos = await Logs.find()
    res.status(200).send(datos);
}

export const AgruparJugadores = async (req, res) => {
    const datos = await players.aggregate().
    group({ _id: "$jugador", JuegosGanado: { $sum: 1 } }).    
    sort({ JuegosGanado: -1 })
        
    res.status(200).send(datos);
}