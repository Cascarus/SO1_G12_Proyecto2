import { Component, Fragment } from "react";
import axios from "axios";

import HOST from "../HOST";

class Logs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            logs: [],
            datos: []
        }
    }

    componentDidMount() {

        axios.get(HOST + "/MostrarDatos")
            .then((res) => {
                this.setState({ logs: res.data })
            })
            .catch((err) => {
                console.log(err)
            })

        axios.get(HOST + "/AgruparJugadores")
            .then((res) => {
                this.setState({ datos: res.data })
            })
            .catch((err) => {
                console.log(err)
            })

    }

    render() {
        return (

            <Fragment>

                <div className="row">

                    <div className="col bg-dark">
                        <div className="card-header" style={{ fontSize: 50, textAlign: "center" }}>
                            Logs
                        </div>
                        <div style={{ padding: "20px" }}>
                            <table className="table table-striped">

                                <thead>
                                    <th style={{ fontSize: "30px" }} > # </th>
                                    <th style={{ fontSize: "30px" }} > No. de Juego </th>
                                    <th style={{ fontSize: "30px" }} > Juego </th>
                                    <th style={{ fontSize: "30px" }} > Ganador </th>
                                    <th style={{ fontSize: "30px" }} > Jugadores </th>
                                    <th style={{ fontSize: "30px" }} > Worker </th>
                                </thead>
                                <tbody>
                                    {
                                        this.state.logs.map((l, i) => {
                                            return (
                                                <tr key={l._id}>
                                                    <td style={{ fontSize: "25px" }}>{l.request_number}  </td>
                                                    <td style={{ fontSize: "25px" }}> {l.game} </td>
                                                    <td style={{ fontSize: "25px" }}> {l.gamename} </td>
                                                    <td style={{ fontSize: "25px" }}> {l.winner} </td>
                                                    <td style={{ fontSize: "25px" }}> {l.players} </td>
                                                    <td style={{ fontSize: "25px" }}> {l.worker} </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>

                    <div className="col bg-dark">
                        <div className="card-header" style={{ fontSize: 50, textAlign: "center" }}>
                            Datos almacenados
                        </div>
                        <div style={{ padding: "20px" }}>
                            <table className="table table-striped">

                                <thead>
                                    <th style={{ fontSize: "30px" }} > Jugador </th>
                                    <th style={{ fontSize: "30px" }} > Juegos ganados </th>
                                    <th style={{ fontSize: "30px" }} > Estado </th>
                                </thead>
                                <tbody>
                                    {
                                        this.state.datos.map((l, i) => {
                                            return (
                                                <tr key={l._id}>
                                                    <td style={{ fontSize: "25px" }}>{l._id}  </td>
                                                    <td style={{ fontSize: "25px" }}> {l.JuegosGanado} </td>
                                                    <td style={{ fontSize: "25px" }}> Ganador </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

            </Fragment>

        )
    }

}


export default Logs