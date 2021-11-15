import Logs from '../models/logs'

export const holaMundo = function(req, res){

    res.send("Hola Mundo")

}
export const MostrarDatos = async (req, res) => {
    const tuits = await Logs.find({});
    res.send(tuits);
}

