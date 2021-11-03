package main

import (
	"context"
	"encoding/json"
	pb "game-gRPC/proto"
	"log"
	"net/http"

	"time"

	"github.com/gorilla/mux"

	"google.golang.org/grpc"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("API GO - gRPC Client\n"))
}

func stratGame(w http.ResponseWriter, req *http.Request) {
	game := mux.Vars(req)["game"]
	player := mux.Vars(req)["player"]
	runGame := mux.Vars(req)["runGame"]

	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure(), grpc.WithBlock())
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
	router.HandleFunc("/game/{game}/gameName/{runGame}/player/{player}", stratGame).Methods("POST")
	log.Println("Listening on port => 2000")
	log.Fatal(http.ListenAndServe(":2000", router))
}
