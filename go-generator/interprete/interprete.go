package interprete

import (
	"fmt"
	"go-generator/funciones"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"
)

var games []string
var players int64
var rung int64
var concurr int64
var tOut int64

type interprete struct {
	comando []string
}

func New(comand string) interprete {
	cmsplit := comand[7:]
	//fmt.Printf("cmsplit: %v\n", cmsplit)
	comansplit := strings.Split(cmsplit, " --")
	coso := interprete{comando: comansplit[1:]}
	limpiar()
	coso.Analizar()
	return coso
}

func (e interprete) Analizar() {

	for i := 0; i < len(e.comando); i++ {
		temp := strings.Split(e.comando[i], "\"")

		if strings.ToLower(temp[0]) == "gamename " {
			games = crearArrayGame(temp[1])
			fmt.Printf("games => %v\n", games)
		}

		temp = strings.Split(e.comando[i], " ")

		if strings.ToLower(temp[0]) == "players" {
			temp_players, err := strconv.ParseInt(temp[1], 10, 64)
			if err != nil || temp_players == 0 {
				funciones.Mensaje("Players solo puede utilizar un numero diferente de 0", 2)
				return
			}
			players = temp_players
			fmt.Printf("players => %v\n", players)
		}

		if strings.ToLower(temp[0]) == "rungames" {
			temp_rungames, err := strconv.ParseInt(temp[1], 10, 64)
			if err != nil || temp_rungames == 0 {
				funciones.Mensaje("Players solo puede utilizar un numero diferente de 0", 2)
				return
			}
			rung = temp_rungames
			fmt.Printf("rungames => %v\n", rung)
		}

		if strings.ToLower(temp[0]) == "concurrence" {
			temp_concurr, err := strconv.ParseInt(temp[1], 10, 64)
			if err != nil || temp_concurr == 0 {
				funciones.Mensaje("Players solo puede utilizar un numero diferente de 0", 2)
				return
			}
			concurr = temp_concurr
			fmt.Printf("concurr => %v\n", concurr)
		}

		if strings.ToLower(temp[0]) == "timeout" {
			temp_timeout, err := strconv.ParseInt(temp[1][:1], 10, 64)
			if err != nil || temp_timeout == 0 {
				funciones.Mensaje("Players solo puede utilizar un numero diferente de 0", 2)
				return
			}
			tOut = temp_timeout
			fmt.Printf("timeout => %v\n", tOut)
		}
	}

	////fmt.Println("\033[1;32mMENSAJE: El disco se ha creado exitosamente!\033[0m")
}

func (e interprete) PrintCom() {
	fmt.Printf("%v\n", e.comando[0])
}

func (e interprete) Ejecutar() {
	results := make(chan string)

	go loadGames(results)

	for j := 0; j < int(rung); j++ {
		funciones.Mensaje(<-results, 0)
	}
	close(results)
}

func loadGames(results chan<- string) {

	for n := 0; n < int(rung); n++ {

		API := os.Getenv("API_HOST")
		tempPlayers := rand.Intn(int(players)) + 1
		tempstrPlayers := strconv.Itoa(tempPlayers)
		tempInd := rand.Intn(len(games))
		tempGame := strings.Split(games[tempInd], ",")

		API += "/game/" + tempGame[0] + "/gameName/" + tempGame[1] + "/players/" + tempstrPlayers
		//url := "http//localhost:2000"

		data := url.Values{
			"name":       {"John Doe"},
			"occupation": {"gardener"},
		}

		resp, err := http.PostForm(API, data)
		if err != nil {
			log.Fatal(err)
		}
		defer resp.Body.Close()

		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatalln(err)
		}

		sb := string(body)

		results <- sb
	}
}

/*
func Mkdisk(contenido []string) {
	unit = 'm'
	//var b_size, b_path, b_name bool

	Opciones_Parametro(contenido)

	if errorGeneral == true {
		return
	}

	if name == "default" {
		funciones.Mensaje("MKDISK debe de llevar un nombre", 2)
		return
	} else if path == "default" {
		funciones.Mensaje("MKDISK debe de llevar un path", 2)
		return
	} else if size < 1 {
		funciones.Mensaje("MKDISK debe de llevar un tamaño", 2)
		return
	} else if unit == 98 {
		funciones.Mensaje("MKDISK debe de usar k(kilobytes) o m(megabytes)", 2)
		return
	}

	verificar := strings.Split(name, ".")
	////fmt.Println(name)
	////fmt.Println(verificar[0], " ", verificar[1])
	if len(verificar) == 2 && strings.ToLower(verificar[1]) != "dsk" {
		funciones.Mensaje("1. El parametro name debe de llevar nombre y la extencion .dsk", 2)
		return

	} else if len(verificar) == 2 && strings.ToLower(verificar[0]) == "" {
		funciones.Mensaje("2. El parametro name debe de llevar nombre y la extencion .dsk", 2)
		return

	} else if len(verificar) < 2 {
		funciones.Mensaje("El parametro name debe de llevar nombre y la extencion .dsk", 2)
		return
	}

	////fmt.Println("Se creara un disco con -size=", size, "-path=", path, "-name=", name, "-unit=", unit)
	mkd := funciones.NewMKDisk(size, path, name, unit)
	//mkd.Ejecutar(5846, 21, 3000)
	mkd.Ejecutar()
	////fmt.Println("Reading File: ")
	//mkd.ReadFile()
}

func Mrdisk(contenido []string) {
	var path string

	if len(contenido) == 1 {
		temp := strings.Split(contenido[0], "->")

		if strings.ToLower(temp[0]) == "path" {
			sin_comillas := strings.Trim(temp[1], "\"")
			//sin_pslice := strings.TrimLeft(sin_comillas, "/")
			path = sin_comillas
		} else {
			funciones.Mensaje("MRDISK solo puede llevar Path", 2)
			return
		}
	} else if len(contenido) == 0 {
		funciones.Mensaje("MRDISK debe llevar un path", 2)
		return

	} else {
		funciones.Mensaje("MRDISK no puede llevar otro parametro que no sea path", 2)
		return
	}

	mrd := funciones.NewMRDisk(path)
	mrd.Ejecutar()

}

func Fdisk(contenido []string) {
	unit = 'k'
	opcionFD = 0
	fit = "wf"
	Opciones_Parametro(contenido)

	if errorGeneral == true {
		return
	}

	if opcionFD == 0 { //crear particion
		if name == "default" {
			funciones.Mensaje("FDISK debe de llevar un nombre", 2)
			return
		} else if path == "default" {
			funciones.Mensaje("FDISK debe de llevar un path", 2)
			return
		} else if size < 1 {
			funciones.Mensaje("FDISK debe de llevar un tamaño", 2)
			return
		}
	} else if opcionFD == 1 { //eliminar
		if name == "default" {
			funciones.Mensaje("FDISK debe de llevar un nombre", 2)
			return
		} else if path == "default" {
			funciones.Mensaje("FDISK debe de llevar un path", 2)
			return
		}
	} else if opcionFD == 2 { //agregar
		if name == "default" {
			funciones.Mensaje("FDISK debe de llevar un nombre", 2)
			return
		} else if path == "default" {
			funciones.Mensaje("FDISK debe de llevar un path", 2)
			return
		}

	}

	////fmt.Println("Se ejecuatara FDISK con -size=", size, "-path=", path, "-name=", name, "-unit=", unit, "-type=", tipo, "-fit=", fit, "-delete=", eliminar, "-add=", agregar)
	fdisk := funciones.NewFDisk(size, unit, path, tipo, fit, eliminar, name, agregar, opcionFD)
	fdisk.Ejecutar()
}

func Exec(contenido []string) {
	var path string

	if len(contenido) == 1 {
		temp := strings.Split(contenido[0], "->")

		if strings.ToLower(temp[0]) == "path" {
			sin_comillas := strings.Trim(temp[1], "\"")
			//sin_pslice := strings.TrimLeft(sin_comillas, "/")
			path = sin_comillas
		} else {
			funciones.Mensaje("Exec solo puede llevar Path", 2)
			return
		}
	} else if len(contenido) == 0 {
		funciones.Mensaje("Exec debe llevar un path", 2)
		return

	} else {
		funciones.Mensaje("Exec no puede llevar otro parametro que no sea path", 2)
		return
	}

	if _, err := os.Stat(path); os.IsNotExist(err) {
		funciones.Mensaje("No existe un archivo con ese nombre en el directorio", 2)
		return

	} else {
		f, err := os.Open(path)

		if err != nil {
			log.Fatal(err)
		}

		defer f.Close()

		scanner := bufio.NewScanner(f)

		com := ""

		for scanner.Scan() {

			if scanner.Text() != "" {
				if scanner.Text()[0] != '#' {
					com += scanner.Text()

					if string(com[len(com)-1]) != "*" {
						fmt.Println(com)
						inter := New(com)
						inter.Ejecutar()
						com = ""
					} else {
						com2 := strings.Trim(com, "\\*")
						com = com2 + " "
					}
				} else {
					fmt.Println(scanner.Text())
				}
			}
		}

		if err := scanner.Err(); err != nil {
			log.Fatal(err)
		}
	}

	//mrd := funciones.NewMRDisk(path)
	//mrd.Ejecutar()

}

func Rep(contenido []string) {

	Opciones_Parametro(contenido)

	if errorGeneral == true {
		return
	}

	if nombre == "default" {
		funciones.Mensaje("Rep debe de llevar el nombre del reporte que desea generar", 2)
		return
	} else if path == "default" {
		funciones.Mensaje("Rep debe de llevar un path", 2)
		return
	} else if IDs == "default" {
		funciones.Mensaje("Rep debe de llevar el id de una particion", 2)
		return
	}
	////fmt.Println("Se ejecuatara REP con -nombre=", nombre, "-path=", path, "-ID=", IDs)
	//rep := reportes.NewReporte(path, nombre, IDs)
	//rep.Generar()
}

func Mount(contenido []string) {
	//fmt.Println("analizo el mount")

	if len(contenido) > 0 {
		Opciones_Parametro(contenido)

		if errorGeneral == true {
			//fmt.Printf("hubo error en mount")
			return
		}

		if name == "default" {
			funciones.Mensaje("Mount debe de llevar un nombre", 2)
			return
		} else if path == "default" {
			funciones.Mensaje("Mount debe de llevar un path", 2)
			return
		}

		funciones.Mount(path, name)
	} else {
		funciones.Mostrar_mounts()
	}

}

func UnMount(contenido []string) {
	for i := 0; i < len(contenido); i++ {
		temp := strings.Split(contenido[i], "->")

		if strings.ToLower(temp[1]) == "" {
			funciones.Mensaje("Id debe de llevar un nombre", 2)
			return
		}
		IDs = temp[1]

		if IDs == "default" {
			funciones.Mensaje("UnMount debe de llevar un nombre", 2)
			return
		}

		funciones.Unmount(IDs)
	}
}

func Mkfs(contenido []string) {
	Opciones_Parametro(contenido)

	if errorGeneral == true {
		return
	}

	if IDs == "default" {
		funciones.Mensaje("FDISK debe de llevar un nombre", 2)
		return
	}

	mkfs := funciones.NewMkfs(IDs, unit, tipo, agregar)
	mkfs.Ejecutar()

}*/

func Opciones_Parametro(contenido []string) {

}

func crearArrayGame(contenido string) []string {
	temp := strings.Split(contenido, " | ")
	contador := 1
	var s []string

	for {
		if contador > len(temp) {
			break
		}

		strTemp := temp[contador-1] + "," + temp[contador]
		s = append(s, strTemp)
		contador += 2
	}

	return s
}

func limpiar() {

	games = nil
	players = -1
	rung = -1
	concurr = -1
	tOut = -1

}
