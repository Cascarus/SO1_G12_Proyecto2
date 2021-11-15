const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const url = process.env.MONGO_CS;
module.exports = {
    MostrarDatos:function (req,res){
        MongoClient.connect(url,function(err, db){
           if (err) throw err;
           const dbo = db.db('squidgame');
           dbo.collection('games').find().toArray(function(err,result){
                   if(err) throw err;
                    console.log(result);
                   // console.log(result.length)
                  // res.send(result);
                    db.close();
        }) 
    });
    },
       
 
    MostrarInsersion:function (req,res){
        MongoClient.connect(url,function(err, db){
            if (err) throw err;
            const dbo = db.db('squidgame');
            dbo.collection('games').aggregate( [
             { $match: {  } },   
             { $group: { _id: "$worker",Count: { $sum: 1 } } },
              
         ] ).toArray(function(err,result){
                 if(err) throw err;
                      console.log(result)
                      //res.send(result);
                      db.close();
            })

    });
    },

     
    
    JuegoTop3:function (req,res){
        MongoClient.connect(url,function(err, db){
           if (err) throw err;
           const dbo = db.db('squidgame');
           dbo.collection('games').aggregate( [
            { $match: {  } },   
            { $group: { _id: "$gamename",Count: { $sum: 1 } } },
            { $sort: { Count:-1 }}
             
        ] ).limit(3).toArray(function(err,result){
                if(err) throw err;
                     console.log(result)
                     //res.send(result);
                     db.close();
           })
    });
    }




    


}