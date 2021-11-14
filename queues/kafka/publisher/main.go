package main

import(
	"fmt"
	"net/http"
	"log"
	"os"
	"time"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	k "kafka/kafka"
	ts "kafka/types"
)


func defaultRoute(c *gin.Context){

	c.JSON(http.StatusOK, "Hola desde Kafka Publisher")
}


func publish(c *gin.Context){

	var newLog ts.Log

    // Call BindJSON to bind the received JSON to
    if err := c.BindJSON(&newLog); err != nil {
        c.JSON(http.StatusInternalServerError, "Bad request body")
    }else{
		err, res := k.SendMessage(newLog)
		if err !=nil{
			c.JSON(http.StatusInternalServerError, fmt.Sprint(err))
		}else{
			c.JSON(http.StatusOK, res)
		}
	}
	
}


func initTopic() {

	err:=k.CreteTopic(os.Getenv("TOPIC"))
	if err !=nil{
		log.Print(err)
		fmt.Println(" ******* RETRYING IN 3s ******* ")
		time.Sleep(3*time.Second)
		initTopic()
	}else{
		k.ListTopics()
	}
}


func main(){

	err := godotenv.Load("e.env")
	if err!=nil{
		fmt.Println("Error loading enviroment variables")
	}

	fmt.Println("============================== CREATING TOPIC ==============================")
		initTopic()
	fmt.Println("============================================================================")

	router := gin.Default()
    router.Use(gin.Recovery()) // Para recuperarse de Errores y enviar un 500

    router.GET("/kafka", defaultRoute)
    router.POST("/send", publish)

    router.Run("0.0.0.0:3000")
}