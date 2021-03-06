import { Component, Fragment } from "react";
import socketIOClient from 'socket.io-client';

import HOST from "../HOST";

const socket = socketIOClient(HOST);


class Players extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedPlayer: null,
            topPlayers: [],
            players: []
        }


        this.selectPlayer = this.selectPlayer.bind(this)
        this.convertToArray = this.convertToArray.bind(this)
    }


    componentDidMount() {

        socket.on("squidgame:front", (data) => {
            this.convertToArray(data.players)
            //430: "{\"JuegosGanados\":24,\"Jugador\":\"430\",\"UltimoJuego\":\"call of duty\",\"Estado\":\"Winner\"}"
        });
    }

    convertToArray(data) {

        const temp = Object.entries(data);
        var temp1 = temp.map(([key, value]) => {
            return {
                player: key,
                data: JSON.parse(value)
            }
        })
        var temp2 = [...temp1]
        this.setState({ players: temp1, topPlayers: temp2.splice(0, 9) })

    }

    selectPlayer() {

        this.setState({ selectedPlayer: "Juan" })

    }

    render() {

        return (

            <Fragment>

                <div>
                    <div className="row" style={{ height: "1000px" }}>

                        <div className="col-4" style={{ padding: "10px" }}>
                            <div className="card" style={{ backgroundColor: "#0f2537" }} >
                                <div className="card-body" style={{ textAlign: "center" }}>
                                    <img src="images/soilders.png" alt="alt" width="70%" style={{ borderRadius: "10px" }} />
                                </div>
                            </div>
                            <div style={{ padding: "20px" }}>
                                <div className="card" style={{ borderRadius: "10px" }} >
                                    {
                                        this.state.topPlayers.map((p) => {
                                            return (
                                                <div key={"top" + p.player} style={{ marginBottom: "20px" }}>
                                                    <div className="card-header bg-success">
                                                        <h1>
                                                            Player #{p.player}
                                                        </h1>
                                                    </div>
                                                    <div className="card-body bg-dark">
                                                        <h1>
                                                            Victorias {p.data.JuegosGanados}
                                                        </h1>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>

                        <div className="col-8" style={{ padding: "10px" }} >

                            {
                                this.state.players.map((p) => {
                                    return (
                                        <div key={p.player} className="fluid-container card card-body" style={{ borderStyle: "solid", borderColor: "white", borderRadius: "5px", backgroundColor: "#1a4a24", marginBottom: "20px" }}>
                                            <div className="row">
                                                <div className="col-3">
                                                    <div className="btn btn-outline-success" style={{ borderColor: "black", borderStyle: "solid", textAlign: "center" }} onClick={() => this.selectPlayer()}>
                                                        <strong>
                                                            <p className="h1" style={{ fontSize: "60px", color: "white" }} > {p.player} </p>
                                                        </strong>
                                                    </div>
                                                </div>
                                                <div className="col-9">
                                                    <div className="row">
                                                        <div className="col" style={{ textAlign: "center" }}>
                                                            <h3><i>Ultimo Juego</i></h3>
                                                            <p className="h1" style={{ fontSize: "50px" }}>
                                                                {p.data.UltimoJuego}
                                                            </p>
                                                        </div>
                                                        <div className="col" style={{ textAlign: "center" }}>
                                                            <h3><i>Juegos ganados</i></h3>
                                                            <div className="card card body bg-danger">
                                                                <p className="h1" style={{ fontSize: "50px" }}>
                                                                    {p.data.JuegosGanados}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }


                        </div>

                    </div>
                </div>

            </Fragment >

        )

    }

}

export default Players