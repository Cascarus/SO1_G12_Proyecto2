import mongoose from "mongoose";
const { Schema, model } = mongoose;

const LogSchema = new Schema({
    request_number: { type: Number, required: true },
    game: { type: String, required: true },
    gamename: { type: String, required: true },
    winner: { type: String, required: true },
    players: { type: Number, required: true },
    worker: { type: String, required: true }
});

export default model('Logs', LogSchema);