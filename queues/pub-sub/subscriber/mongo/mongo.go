package mongo

import(
	"fmt"
	"errors"
	"os"
	"time"
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	ts "pubsub/types"
)


func Connect() (*mongo.Client, error) {
	
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
	defer cancel()

	clientOptions := options.Client().ApplyURI(os.Getenv("MONGO_CS")).SetDirect(true)
	c, err := mongo.NewClient(clientOptions)

	err = c.Connect(ctx)

	if err != nil {
        return nil, errors.New("Unable to initialize database connection")
		//log.Fatalf("unable to initialize connection %v", err)
	}
	err = c.Ping(ctx, nil)
	if err != nil {
        return nil, errors.New("Unable to connect to database")
		//log.Fatalf("unable to connect %v", err)
	}

	return c, nil
}



// creates a todo
func Create(log ts.Log) (string, error) {

	c, err := Connect()
    
    if err!=nil {
        fmt.Println(err)
        return "", err
    }

    ctx := context.Background()
    defer c.Disconnect(ctx)

    todoCollection := c.Database("squidgame").Collection("games")
    r, err := todoCollection.InsertOne(ctx, log)
    if err != nil {
        return "", errors.New("Failed to load Log")
    }
    //fmt.Println("added todo", r.InsertedID)

	return "Log loaded successfully with id: "+fmt.Sprint(r.InsertedID), nil
}