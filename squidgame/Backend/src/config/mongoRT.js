import logSchema from '../models/logs.js'

const program = (socket) => {

    const changeStream = logSchema.watch(
        [
            { $match: { "operationType": { $in: ["insert", "update", "replace"] } } },
            { $project: { "_id": 1, "fullDocument": 1, "ns": { db: 'squidgame', coll: 'games' }, "documentKey": 1 } }
        ],
        { fullDocument: "updateLookup" }
    );

    changeStream.on('change', (data) => {
        console.log(data.fullDocument); // You could parse out the needed info and send only that data. 
        //socket.emit("COSMOS", data)
    });

}

export default program;