package suscriber

import (
        "fmt"
        "log"
        "github.com/streadway/amqp"
        rds "Suscriber/redis"
	ts "Suscriber/type"
        "encoding/json"
        mongo "Suscriber/mongo"

)
var players map[string]int //==> "Efrain": 10
func failOnError(err error, msg string) {
        if err != nil {
                log.Fatalf("%s: %s", msg, err)
        }
}

func Start_suscriber() {

        rds.CrateClient()
        players = make(map[string]int)
	//ctx := context.Background()
        /*
	if err != nil {
		return fmt.Errorf("pubsub.NewClient: %v", err)
	}
	defer client.Close() 
        */
        conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
        failOnError(err, "Failed to connect to RabbitMQ")
        defer conn.Close()

        ch, err := conn.Channel()
        failOnError(err, "Failed to open a channel")
        defer ch.Close()

        err = ch.ExchangeDeclare(
                "logs",   // name
                "fanout", // type
                true,     // durable
                false,    // auto-deleted
                false,    // internal
                false,    // no-wait
                nil,      // arguments
        )
        failOnError(err, "Failed to declare an exchange")

        q, err := ch.QueueDeclare(
                "",    // name
                false, // durable
                false, // delete when unused
                true,  // exclusive
                false, // no-wait
                nil,   // arguments
        )
        failOnError(err, "Failed to declare a queue")

        err = ch.QueueBind(
                q.Name, // queue name
                "",     // routing key
                "logs", // exchange
                false,
                nil,
        )
        failOnError(err, "Failed to bind a queue")

        msgs, err := ch.Consume(
                q.Name, // queue
                "",     // consumer
                true,   // auto-ack
                false,  // exclusive
                false,  // no-local
                false,  // no-wait
                nil,    // args
        )
        failOnError(err, "Failed to register a consumer")

        forever := make(chan bool)

        go func() {
                for d := range msgs {
                        var newLog ts.Log
                        if err := json.Unmarshal(d.Body, &newLog); err != nil {
                                panic(err)
                        }
                        fmt.Println("New message", newLog.Request_number)    
                        go func(){
                                sendToRedis(newLog)
                        }()  
                        /*
                        fmt.Println("New message", newLog.Request_number)    
                        */
                        result, mongoEr := mongo.Create(newLog,"games")
		        if mongoEr!=nil{
			 log.Print(mongoEr)
		        }else{
			 fmt.Println(result)
		        }
                        
                        log.Printf(" [x] %s", d.Body)
                }
        }()
             
        log.Printf(" [*] Waiting for logs. To exit press CTRL+C")
        <-forever
}


func sendToRedis(newLog ts.Log){

	players[newLog.Winner] = players[newLog.Winner]+1
	data := struct {
		JuegosGanados int
		Jugador	string
		UltimoJuego string
		Estado string
	}{
		players[newLog.Winner],
		newLog.Winner,
		newLog.Gamename,
		"Winner",
	}		

	jsonString, _:=json.Marshal(data)
	rds.SetHash(newLog.Winner, string(jsonString))
        fmt.Println(data)
	mongo.Create(data, "players")



}

