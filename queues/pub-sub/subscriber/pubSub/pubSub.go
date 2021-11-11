package pubSub

import (
	"fmt"
	"context"
	"os"
	"log"
	"errors"
	"time"
	"sync"

	"cloud.google.com/go/pubsub"
	"io/ioutil"
	"google.golang.org/api/option"
	"golang.org/x/oauth2/google"
	
	rds "pubsub/redis"
	ts "pubsub/types"
	mongo "pubsub/mongo"
)


func createClient(ctx context.Context) (*pubsub.Client, error) {

	data, er := ioutil.ReadFile("./PK/ps.json")
	if er != nil {
		log.Fatal(er)
	}
	creds, err := google.CredentialsFromJSON(ctx, []byte(data), pubsub.ScopePubSub)
	if err != nil {
		return nil, errors.New("Error with cred file")
	}

	client, err := pubsub.NewClient(ctx, os.Getenv("PROYECT"), option.WithCredentials(creds))
	return client, err
}

func PullMsgs() error {
	// projectID := "my-project-id"
	// subID := "my-sub"
	rds.CrateClient()
	ctx := context.Background()
	
	client, err := createClient(ctx)

	if err != nil {
		return fmt.Errorf("pubsub.NewClient: %v", err)
	}
	defer client.Close()

	// Consume 10 messages.
	var mu sync.Mutex
	sub := client.Subscription(os.Getenv("SUB"))
	cctx, cancel := context.WithTimeout(ctx, 3600*time.Second)
	defer cancel()
	fmt.Println("Subscriber will close in 3600 Seconds")

	err = sub.Receive(cctx, func(ctx context.Context, msg *pubsub.Message) {
		mu.Lock()
		defer mu.Unlock()
		newLog:= ts.Log{
			Request_number: msg.Attributes["request_number"],
			Game: msg.Attributes["game"],
			Game_name: msg.Attributes["gamename"],
			Winner: msg.Attributes["winner"],
			Players: msg.Attributes["players"],
			Worker: msg.Attributes["worker"],
		}
		fmt.Println("New message", newLog)
		rds.SetData("Winner", newLog.Winner)
		result, mongoEr := mongo.Create(newLog)
		if mongoEr!=nil{
			log.Print(mongoEr)
		}else{
			fmt.Println(result)
		}
		
		//msg.Ack()
	})
	if err != nil {
		return fmt.Errorf("Receive: %v", err)
	}
	return nil
}