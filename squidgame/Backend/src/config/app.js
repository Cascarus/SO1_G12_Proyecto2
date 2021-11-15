import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
<<<<<<< HEAD

=======
import dotenv from 'dotenv';
import Groutes from '../routes/Games.js'
>>>>>>> Database
// INITIALIZE =====================================
const app = express();
import './mongo.js'
import './redis.js'

import program from './streams.js'
program()

//=================================================


// SET PORT =======================================
app.set('port', process.env.PORT);
//=================================================

//MIDDLEWARES =====================================
app.use(express.urlencoded({ extended: false }));
app.use(morgan('method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(cors());
//=================================================


// ROUTES =========================================

app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.use("/hola", async (req, res) => {

   const logs = await logSchema.find({});
   res.send(logs);

})

<<<<<<< HEAD
   res.send("hola");
=======
app.use(Groutes)
>>>>>>> Database


app.use((req, res, next) => {
   res.status(404).send('404 Not Found');
});
//=================================================


// STATICS ========================================
//=================================================

export default app;


/*db.games.find({})
db.games.insertOne(
        {
                "request_number" : "8478",
                "game" : "12",
                "gamename" : "testRabbit",
                "winner" : "1",
                "players" : "1",
                "worker" : "PubSub"
        }
)


db.games.aggregate( [
        { $group: { _id: "$game" },
        { $count: {}}
     ] );


db.games.aggregate([
        {
        $group: {
        _id: "$game",
        cantidad: {
                $count: {}
                }
        }
        },
        {$sort: { cantidad: -1 }},
        { $limit: 3 }
]);*/