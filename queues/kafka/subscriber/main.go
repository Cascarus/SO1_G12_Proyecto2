package main

import(
	"fmt"
	//"log"
	"time"
	"github.com/joho/godotenv"
	k "kafka/kafka"
)

func main(){


	err := godotenv.Load("e.env")
	if err!=nil{
		fmt.Println("Error loading enviroment variables")
	}else{

		fmt.Println("=========== CONSUMER LISTENING ===========")

		finish:=k.Consume()
		for finish=="done"{
			fmt.Println(" ***** RETRYING IN 3s ***** ")
			time.Sleep(3*time.Second)
			finish=k.Consume()
		}
		/*err, res := k.Consume()
		if err != nil{
			log.Print(err)
		}else{
			fmt.Println(res)
		}*/
	}


	fmt.Println("")
}