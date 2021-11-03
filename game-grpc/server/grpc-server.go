package main

import (
	"context"
	pb "game-gRPC/proto"
	"log"
	"math/rand"
	"net"
	"strconv"

	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedSquidGameServer
}

func (s *server) StratGame(ctx context.Context, in *pb.GameRequest) (*pb.GameReply, error) {
	log.Printf("Recibio: %v, %v, %v", in.GetIdGame(), in.GetPlayer(), in.GetRunGames())

	strID := in.GetIdGame()
	strPlayer := in.GetPlayer()
	strRunGames := in.GetRunGames()

	intID, err := strconv.Atoi(in.GetIdGame())
	if err != nil {
		log.Fatalf("Error al convertir a int: %v", err)
	}
	intPlayer, err := strconv.Atoi(in.GetPlayer())
	if err != nil {
		log.Fatalf("Error al convertir a int: %v", err)
	}

	ganador := 0

	switch intID {
	case 1:
		ganador = juego1(intPlayer)
	case 2:
		ganador = juego2(intPlayer)
	case 3:
		ganador = juego3(intPlayer)
	default:
		ganador = -1
	}

	if ganador == -1 {
		return &pb.GameReply{Resultado: "Error: No existe el juego " + strRunGames}, nil
	}

	//strMensaje := "llegaron los valores => idGame:" + strID + ", players:" + strPlayer + ", runGames:" + strRunGames

	strMensaje := "El ganador del juego es:" + strconv.Itoa(ganador) + " (idGame:" + strID + ", players:" + strPlayer + ", runGames:" + strRunGames + ")"

	return &pb.GameReply{Resultado: strMensaje}, nil
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterSquidGameServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

func juego1(players int) int {
	log.Printf("llego a juego1")
	return rand.Intn(players) + 1
}

func juego2(players int) int {
	log.Printf("llego a juego2")

	var lista [17]int

	for i := 0; i < 17; i++ {
		lista[i] = rand.Intn(players) + 1
		log.Println(lista[i])
	}

	index := rand.Intn(17)

	return lista[index]
}

func juego3(players int) int {
	log.Printf("llego a juego3")

	var lista [11]int

	for i := 0; i < 11; i++ {
		lista[i] = rand.Intn(players) + 1
		log.Println(lista[i])
	}

	num1 := rand.Intn(11)
	num2 := rand.Intn(11)
	tipoOp := rand.Intn(2)

	index := 0

	if tipoOp == 0 {
		index = num1 + num2
	} else {
		index = num1 - num2
	}

	if index > 11 {
		index -= 11
	} else if index < 0 {
		index += 11
	}

	if index-1 < 0 {
		return lista[0]
	} else {
		return lista[index-1]
	}
}
