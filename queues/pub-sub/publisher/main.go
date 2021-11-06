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

	ps.InitPubSub(newLog)

	c.JSON(http.StatusInternalServerError, newLog)
}


func main() {

	err := godotenv.Load("e.env")
	if err!=nil{
		fmt.Println("Error loading enviroment variables")
	}

    fmt.Println("")
    fmt.Println(" ==========================  SERVIDOR  ========================== ")
    fmt.Println("")
	router := gin.Default()
    router.Use(gin.Recovery()) // Para recuperarse de Errores y enviar un 500

    //router.GET("/startLoad/go", startLoad)
    router.POST("/send", publish)

    router.Run()
}
