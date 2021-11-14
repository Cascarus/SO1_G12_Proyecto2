import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

// INITIALIZE =====================================
const app = express();
import './mongo.js'
import logSchema from '../models/logs.js'
dotenv.config();
import program from './mongoRT.js'
program()
//
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

app.use(("hola", async (req, res) => {

    const logs = await logSchema.find({});
    res.send(logs);

}))

app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});
//=================================================


// STATICS ========================================
//=================================================

export default app;



/*
replication:
  replSetName: squidgameRS


rs.initiate(
   {
      _id: "squidgameRS",
      version: 1,
      members: [
         { _id: 0, host : "35.223.125.235:27017" },
         { _id: 1, host : "0.0.0.0:27017" }
      ]
   }
)


rs.initiate(
   {
      _id: "squidgameRS",
      version: 1,
      members: [
         { _id: 0, host : "35.223.125.235:27017" }
      ]
   }
)
*/