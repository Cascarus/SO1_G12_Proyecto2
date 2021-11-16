package tipo

type Mensaje struct {
	Request_number int `json:"request_number"`
	Game int `json:"game"`
	Gamename string `json:"gamename"`
	Winner string `json:"winner"`
	Players int `json:"players"`
	Worker string   `json:"worker"`
}