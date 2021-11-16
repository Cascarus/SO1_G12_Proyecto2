package main
import (
	"fmt"
	//"encoding/json"
    //"github.com/gin-gonic/gin"
    //"net/http"
	sub "Suscriber/Sub"
	"github.com/joho/godotenv"
	"time" 
	)
func main(){
	err := godotenv.Load("e.env")
	if err!=nil{
		fmt.Println("Error loading enviroment variables")
	}else{
        fmt.Println("=========== SUSBSCRIER LISTENING ===========")
        fmt.Println("===============================")
        res:= sub.Start_suscriber()
		fmt.Println("===============================")
        
		for res == "ok"{
			fmt.Println("========Reconexion=============")
             time.Sleep(time.Second*10)
			res= sub.Start_suscriber()
		}
		
    }
}