import { Component, Fragment } from "react";
import axios from 'axios'
import HOST from '../HOST'

class Games extends Component {

    constructor(props) {
        super(props)
        this.state = {
            topGames: [
                {
                    _id: "",
                    Count: ""
                },
                {
                    _id: "",
                    Count: ""
                }, {
                    _id: "",
                    Count: ""
                }
            ],
            lastGames: []
        }
    }

    componentDidMount() {

        axios.get(HOST + '/Top3Juegos')
            .then((res) => {
                console.log(res.data)
                this.setState({ topGames: res.data })
            })
            .catch((err) => {

            })

        axios.get(HOST + '/Ultimo10_Juegos')
            .then((res) => {
                console.log(res.data)
                this.setState({ lastGames: res.data })
            })
            .catch((err) => {

            })

    }

    render() {
        return (

            <Fragment>

                <div className="row">

                    <div className="col" style={{ marginLeft: "20px", marginRight: "20px" }}>

                        <div className="card bg-success" style={{ marginBottom: "20px" }}>
                            <div className="row" style={{ margin: "10px" }}>
                                <div className="col">
                                    <div className="row">
                                        <div className="col">
                                            <img src="./images/game2.png" alt="alt" style={{ width: "40%" }} />
                                        </div>
                                        <div className="col">
                                            <strong> <h1> <i> Juego </i> </h1> </strong>
                                            <p style={{ fontSize: "30px" }}> {this.state.topGames[0]._id} </p>
                                            <h1> <i> Veces jugadas </i> </h1>
                                            <p style={{ fontSize: "30px" }}> {this.state.topGames[0].Count} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col" style={{ marginLeft: "20px", marginRight: "20px", color: "black" }}>

                        <div className="card bg-warning" style={{ marginBottom: "20px" }}>
                            <div className="row" style={{ margin: "10px" }}>
                                <div className="col">
                                    <div className="row">
                                        <div className="col">
                                            <img src="./images/game3.png" alt="alt" style={{ width: "60%" }} />
                                        </div>
                                        <div className="col">
                                            <strong> <h1> <i> Juego </i> </h1> </strong>
                                            <p style={{ fontSize: "30px" }}> {this.state.topGames[1]._id} </p>
                                            <h1> <i> Veces jugadas </i> </h1>
                                            <p style={{ fontSize: "30px" }}> {this.state.topGames[1].Count} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col" style={{ marginLeft: "20px", marginRight: "20px" }}>

                        <div className="card bg-danger" style={{ marginBottom: "20px" }}>
                            <div className="row" style={{ margin: "10px" }}>
                                <div className="col">
                                    <div className="row">
                                        <div className="col">
                                            <img src="./images/game4.png" alt="alt" style={{ width: "60%" }} />
                                        </div>
                                        <div className="col">
                                            <strong> <h1> <i> Juego </i> </h1> </strong>
                                            <p style={{ fontSize: "30px" }}> {this.state.topGames[2]._id} </p>
                                            <h1> <i> Veces jugadas </i> </h1>
                                            <p style={{ fontSize: "30px" }}> {this.state.topGames[2].Count} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                this.state.lastGames.map((g, i) => {
                                    return (
                                        <tr>
                                            <td style={{ fontSize: "25px" }}> {g.request_number} </td>
                                            <td style={{ fontSize: "25px" }}> {g.request_number} </td>
                                            <td style={{ fontSize: "25px" }}> {g.request_number} </td>
                                            <td style={{ fontSize: "25px" }}> {g.request_number} </td>
                                            <td style={{ fontSize: "25px" }}> {g.request_number} </td>
                                            <td style={{ fontSize: "25px" }}> {g.request_number} </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                </div>

            </Fragment>
        )
    }

}

export default Games