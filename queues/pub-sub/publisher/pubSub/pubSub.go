package pubSub

import (
	"fmt"
	"os"
	"errors"
	"log"
	"context"
	"cloud.google.com/go/pubsub"
	"strconv"
	ts "pubsub/types"

	"io/ioutil"
	"google.golang.org/api/option"
	"golang.org/x/oauth2/google"
)

var topic *pubsub.Topic

func InitPubSub() error {

	err:= start()

	if err != nil{
		fmt.Println("Couldn't connect to topic")
		return errors.New("Couldn't connect to topic")
	}else{
		fmt.Println("Connected to topic")
		return nil
	}
}


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


func start() error {

	ctx := context.Background()

	//************************************** REDING CRED FILE AND CREATING A CLIENT

	client, err := createClient(ctx)

	//************************************** VERIFY IF THE TOPIC EXISTS
	
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()

	topicName := os.Getenv("TOPIC")
	topic = client.Topic(topicName)

	//************************************** CREATE THE TOPIC IF IT DOESN'T EXISTS

	exists, err := topic.Exists(ctx)
	if err != nil {
		log.Print(err)
		return nil
	}
	if !exists {
		log.Printf("Topic %v doesn't exist - creating it", topicName)
		_, err = client.CreateTopic(ctx, topicName)
		if err != nil {
			return errors.New("Topic couldn't be created...")
		}
	}
	return nil

	//****************************************************************************
}


func PublishMessage(message ts.Log) error {

	ctx := context.Background()

	//************************************** REDING CRED FILE AND CREATING A CLIENT

	client, err := createClient(ctx)

	//****************************************************************************

	t := client.Topic(os.Getenv("TOPIC"))
	result := t.Publish(ctx, &pubsub.Message{
			Data: []byte("Load completed!"),
			Attributes: map[string]string{
					"request_number": strconv.Itoa(message.Request_number),
					"game":strconv.Itoa(message.Game),
					"gamename":message.Gamename,
					"winner":message.Winner,
					"players":strconv.Itoa(message.Players),
					"worker":message.Worker,
			},
	})
	// Block until the result is returned and a server-generated
	// ID is returned for the published message.
	id, err := result.Get(ctx)
	if err != nil {
		fmt.Println("Error 2")
		log.Print(err)
		return fmt.Errorf("Get: %v", err)
	}
	fmt.Println("Published message with custom attributes; msg ID: %v\n", id)
	return nil

}