import Logs from '../models/logs.js'
//{ $match: {  } },

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
