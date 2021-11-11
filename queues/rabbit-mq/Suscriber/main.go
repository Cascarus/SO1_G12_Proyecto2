package main
import (
	"fmt"
	//"encoding/json"
    //"github.com/gin-gonic/gin"
    //"net/http"
	sub "Suscriber/Sub"
	"github.com/joho/godotenv"
	)
func main(){
	err := godotenv.Load("e.env")
	if err!=nil{
		fmt.Println("Error loading enviroment variables")
	}else{
        fmt.Println("=========== SUBSCRIBER LISTENING ===========")
        sub.Start_suscriber()
    }
}