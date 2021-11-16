package kafka

import(
	"fmt"
	"time"
	"log"
	"context"
	"os"
	"errors"
	"encoding/json"
	kfk "github.com/segmentio/kafka-go"
	ts "kafka/types"
	mongo "kafka/mongo"
	rds "kafka/redis"
)

func Read() (error, string) {
	
	conn, err := kfk.DialLeader(context.Background(), "tcp", os.Getenv("BROKER"), os.Getenv("TOPIC"), 0)
	if err != nil {
		log.Print("Failed to dial leader:", err)
		return errors.New("Failed to dial leader"), ""
	}
	
	fmt.Println("Consumer close in 120 seconds")
	conn.SetReadDeadline(time.Now().Add(10*time.Second))
	batch := conn.ReadBatch(10e3, 1e6) // fetch 10KB min, 1MB max
	
	b := make([]byte, 10e3) // 10KB max per message
	for {
		n, err := batch.Read(b)
		if err != nil {
			break
		}
		fmt.Println(string(b[:n]))
	}
	
	if err := batch.Close(); err != nil {
		log.Print("Failed to close batch:", err)
		return errors.New("Failed to close batch"), ""
	}
	
	if err := conn.Close(); err != nil {
		log.Print("Failed to close connection:", err)
		return errors.New("Failed to close connection"), ""
	}

	return nil, "Cosumer closed"
}



func Consume(){


	r := kfk.NewReader(kfk.ReaderConfig{
		Brokers:   []string{os.Getenv("BROKER")},
		Topic:     os.Getenv("TOPIC"),
		Partition: 0,
		MinBytes:  10e3, // 10KB
		MaxBytes:  10e6, // 10MB
	})
	//r.SetOffset(1)
	rds.CrateClient()
	
	for {
		m, err := r.ReadMessage(context.Background())
		if err != nil {
			break
		}

		var newLog ts.Log
		err = json.Unmarshal(m.Value, &newLog)
		if err != nil {
			panic(err)
		}
		newLog.Worker = "kafka"
		fmt.Println(newLog)
		mongo.Create(newLog)
		rds.SetData("winner", newLog.Winner)

		//fmt.Printf("message at offset %d: %s = %s\n", m.Offset, string(m.Key), string(m.Value))
	}
	
	if err := r.Close(); err != nil {
		log.Print("failed to close reader:", err)
	}

}