package main
import (
	"fmt"
	"encoding/json"
     pub "rabbit-mq/Publisher"
     tip "rabbit-mq/Modelo"
    "github.com/gin-gonic/gin"
    "net/http" 	   
)   
/*
type User struct {
    Name string `json:"full_name"`
    Age int `json:"age"`
    Active bool `json:"active"`
    Log string `json:"log"`
}
*/





func main() {
    fmt.Println("")
    fmt.Println(" ==========================  SERVIDOR  ========================== ")
    fmt.Println("")
    router := gin.Default()
    router.POST("/send", func(c *gin.Context) {
        
        var sms  tip.Mensaje  // se declara sms con el tipo de mensaje
        /* en el if lo que hace es verficar un error, 
           y el "c.BindJson(&sms)" captura el request que es enviado atravez del post y lo almacena en 
           la variable sms
        */    
        if errs := c.BindJSON(&sms); errs != nil{
             return 
        }else{
            //sms = tip.Mensaje{3001,5,"Game1","001",50,"RabbitMQ"}         
            datos, err := json.Marshal(sms) // aqui esta el processo de convertir un string
            if err != nil {
                panic(err)
            }
            /*
              el metodo string(datos) parse por completo la variable datos
              y lo convierte en un string y la funcion   pub.Start_suscription es la que se encarga
              de publicar el mensaje.
            */
            pub.Start_suscription(string(datos))  
            c.String(http.StatusOK, "Se envio el mensaje")           
        }
        fmt.Printf(" ==========================  Datos Enviados  ========================== ")
    })
    router.Run(":8080")
  

	
}