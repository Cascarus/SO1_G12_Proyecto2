package main

import(
	"fmt"
	//"log"
	"github.com/joho/godotenv"
	k "kafka/kafka"
)

func main(){


	err := godotenv.Load("e.env")
	if err!=nil{
		fmt.Println("Error loading enviroment variables")
	}else{

		fmt.Println("=========== CONSUMER LISTENING ===========")

		k.Consume()
		/*err, res := k.Consume()
		if err != nil{
			log.Print(err)
		}else{
			fmt.Println(res)
		}*/
	}


	fmt.Println("")

}