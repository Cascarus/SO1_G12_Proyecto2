package main

import (
	"context"
	"encoding/json"
	pb "game-gRPC/proto"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"

	"google.golang.org/grpc"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("API GO - gRPC Client\n"))
}

func PubSub(w http.ResponseWriter, r *http.Request) {
	resp, err := http.Get("server-pubsub:8080/pubusb")

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		log.Fatal(err)
	}
	w.Write([]byte(string(body)))
}

func stratGame(w http.ResponseWriter, req *http.Request) {
	game := mux.Vars(req)["game"]
	player := mux.Vars(req)["player"]
	runGame := mux.Vars(req)["runGame"]

	conn, err := grpc.Dial(os.Getenv("HOST")+":50051", grpc.WithInsecure(), grpc.WithBlock())
	//conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewSquidGameClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	reply, err := c.StratGame(ctx, &pb.GameRequest{
		IdGame:   game,
		RunGames: runGame,
		Player:   player,
	})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	//log.Printf("Greeting: %s", reply.GetResultado())

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(struct {
		Mensaje string `json:"mensaje"`
	}{Mensaje: reply.GetResultado()})
}

func main() {
	router := mux.NewRouter().StrictSlash(false)
	router.HandleFunc("/", IndexHandler)
	router.HandleFunc("/pubsub", PubSub)
	router.HandleFunc("/game/{game}/gameName/{runGame}/players/{player}", stratGame).Methods("POST")
	log.Println("Listening on port => 2000")
	log.Fatal(http.ListenAndServe(":2000", router))
}
