package types

type Log struct {

    Request_number int `json:"request_number"`
	Game int `json:"game"`
	Game_name string `json:"gamename"`
	Winner string `json:"winner"`
	Players int `json:"players"`
	Worker string `json:"worker"`

}
