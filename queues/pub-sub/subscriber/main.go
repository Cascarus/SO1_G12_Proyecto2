package main

import(
	"fmt"
	"log"
	ps "pubsub/pubSub"

	"github.com/joho/godotenv"
)

func main(){

	err := godotenv.Load("e.env")
	if err!=nil{
		fmt.Println("Error loading enviroment variables")
	}else{
		err := ps.PullMsgs()
		if err!=nil{
			log.Print(err)
		}
	}
}