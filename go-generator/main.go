package main

import (
	"bufio"
	"fmt"
	"go-generator/funciones"
	"go-generator/interprete"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load(".env")

	if err != nil {
		funciones.Mensaje("No se pudo cargar el archivo .env", 2)
	}

	reader := bufio.NewReader(os.Stdin)

	for {
		funciones.Mensaje(">", 0)
		comando, _ := reader.ReadString('\n')
		com := strings.TrimRight(comando, "\r\n")
		if com == "exit" {
			break
		}

		if com != "" {
			inter := interprete.New(com)
			inter.Ejecutar()
		}

	}

	fmt.Println("----------------------------El programa ha finalizado----------------------------")
}
