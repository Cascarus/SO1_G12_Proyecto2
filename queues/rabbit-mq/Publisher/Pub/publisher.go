package publisher

import (
        "log"
       // "os"
        //"strings"
        "github.com/streadway/amqp"
)

func failOnError(err error, msg string) {
        if err != nil {
                log.Fatalf("%s: %s", msg, err)
        }
}

func Start_suscription(body string) {
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

        //body := bodyFrom(os.Args)
        err = ch.Publish(
                "logs", // exchange
                "",     // routing key
                false,  // mandatory
                false,  // immediate
                amqp.Publishing{
                        ContentType: "text/plain",
                        Body:        []byte(body),
                })
        failOnError(err, "Failed to publish a message")

        log.Printf(" [x] Sent %s", body)
}


/*db.games.find({})
db.games.insertOne(
        {
                "request_number" : "8478", 
                "game" : "12", 
                "gamename" : "testRabbit", 
                "winner" : "1", 
                "players" : "1", 
                "worker" : "PubSub"
        }
)


db.games.aggregate( [
        { $group: { _id: "$game" },
        { $count: {}}
     ] );


db.games.aggregate([
        {
        $group: {
        _id: "$game",
        cantidad: {
                $count: {}
                }
        }
        },
        {$sort: { cantidad: -1 }},
        { $limit: 3 }
]);*/