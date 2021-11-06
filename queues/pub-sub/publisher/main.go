package main

import(
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	ts "pubsub/types"
	ps "pubsub/pubSub"
)

func publish(c *gin.Context) {
    //t := time.Now()
    var newLog ts.Log

    // Call BindJSON to bind the received JSON to
    if err := c.BindJSON(&newLog); err != nil {
        return
    }
	
	if connectedTopic {
		err := ps.PublishMessage(newLog)
		if err!= nil {
			c.JSON(http.StatusInternalServerError, fmt.Sprint(err))
		}else{
			c.JSON(http.StatusOK, "Message sended")
		}
	}else{
		connectToTopic()
		c.JSON(http.StatusInternalServerError, "Server couldn't connect to the Topic")
	}
}


func connectToTopic(){

	err:=ps.InitPubSub()
	if err!=nil{
		fmt.Println(err)
	}else{
		connectedTopic = true
	}

}

var connectedTopic = false
func main() {

	err := godotenv.Load("e.env")
	if err!=nil{
		fmt.Println("Error loading enviroment variables")
	}

	connectToTopic()

	fmt.Println("")
    fmt.Println(" ==========================  SERVIDOR  ========================== ")
    fmt.Println("")
	router := gin.Default()
    router.Use(gin.Recovery()) // Para recuperarse de Errores y enviar un 500

    //router.GET("/startLoad/go", startLoad)
    router.POST("/send", publish)

    router.Run()
}
