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
    /********Esta funcion me retorna el total de insersciones de kafka****** */ 
    
    MostrarInsersion_Kafka:function (req,res){
        MongoClient.connect(url,function(err, db){
           if (err) throw err;
           const dbo = db.db('squidgame');
           dbo.collection('games').find({worker: 'kafka'}).toArray(function(err,result){
                   if(err) throw err;
                    //console.log(result);
                    console.log("kafka",result.length)
                    // res.send(result);
                    db.close();
        }) 
    });
    },   
/********Esta funcion me retorna el total de insersciones de kafka****** */ 
    
    MostrarInsersion_Rabbit:function (req,res){
        MongoClient.connect(url,function(err, db){
           if (err) throw err;
           const dbo = db.db('squidgame');
           dbo.collection('games').find({worker: 'Rabbit'}).toArray(function(err,result){
                   if(err) throw err;
                    //console.log(result);
                    console.log("rabbit",result.length)
                  // res.send(result);
                    db.close();
        }) 
    });
    },
    
    MostrarInsersion_Pubsub:function (req,res){
        MongoClient.connect(url,function(err, db){
           if (err) throw err;
           const dbo = db.db('squidgame');
           dbo.collection('games').find({worker: 'PubSub'}).toArray(function(err,result){
                   if(err) throw err;
                    //console.log(result);
                    console.log("Pubsub",result.length)
                
                    // res.send(result);
                    db.close();
        })

    });
    },


    
    Top3:function (req,res){
        MongoClient.connect(url,function(err, db){
           if (err) throw err;
           const dbo = db.db('squidgame');
           //.distinct("gamename")
           dbo.collection('games').aggregate( [
            { $match: {  } },   //,game: { $sum: "$game" }
            { $group: { _id: "$gamename", game: { $size: "$game" } } }
            //{ $project: { value: { count: { $size: "gamename" } } }}  
        
        ] ).toArray(function(err,result){
                if(err) throw err;
                     console.log(result)
                     //res.send(result);
                     db.close();
           })
           
           
           dbo.collection('games').find({worker: 'PubSub'}).toArray(function(err,result){
                   
        })

    });
    }



}