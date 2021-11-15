import Logs from '../models/logs.js'
//{ $match: {  } },

/*
[
           
        { $group:  },
        { $sort: { Count:-1 }},
        { $limit: 3}

        ]


        */ 

export const Top3Juegos = async (req, res) => {
    /*
    const datos = await Logs.aggregate().
    group({ _id: "$gamename",Count: { $count: {} } }).
    sort({ Count:-1 }).limit(3);
    */
    res.status(200).send("hola mundo");    
}
