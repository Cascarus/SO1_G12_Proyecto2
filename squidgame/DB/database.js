const MongoClient = require('mongodb').MongoClient;
//const mongoose =  require('mongodb');

require('dotenv').config();
const url = process.env.MONGO_CS;
module.exports = {
/*    
    MostrarDatos:function (req,res){
        MongoClient.connect(url,function(err, db){
           if (err) throw err;
           const dbo = db.db('squidgame');
           dbo.collection('games').find().toArray(function(err,result){
                   if(err) throw err;
                    //res.send(result);
                    console.log(result)  
                    db.close();
        }) 
    });
    },
     
    
    Ultimo10_Juegos:function (req,res){
       MongoClient.connect(url,function(err, db){
           if (err) throw err;
           const dbo = db.db('squidgame');
           dbo.collection('games').find().limit(10).sort({gamename: 1}).toArray(function(err,result){
           if(err) throw err;
           //res.send(result);  
           console.log(result)  
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
    

*/

    


}