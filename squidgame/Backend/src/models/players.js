import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PlayerSchema = new Schema({
    JuegosGanados: { type: Number, required: true },
    Jugador: { type: String, required: true },
    UltimoJuego: { type: String, required: true },
    Estado: { type: String, required: true },
});

export default model('players', PlayerSchema);