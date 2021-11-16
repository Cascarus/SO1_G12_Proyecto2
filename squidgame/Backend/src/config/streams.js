import logSchema from '../models/logs.js'
import client from './redis.js'

const program = (socket) => {

    const changeStream = logSchema.watch(
        [
            { $match: { "operationType": { $in: ["insert", "update", "replace"] } } },
            { $project: { "_id": 1, "fullDocument": 1, "ns": { db: 'squidgame', coll: 'games' }, "documentKey": 1 } }
        ],
        { fullDocument: "updateLookup" }
    );


    changeStream.on('change', (data) => {
        var players;
        client.hgetall("players:all", function (err, value) {
            //console.log(value); // > "bar"
            players = value
        });
        socket.emit("squidgame", { games: data.fullDocument, players: players })
        //console.log(data.fullDocument); // You could parse out the needed info and send only that data.
    });

}

export default program;