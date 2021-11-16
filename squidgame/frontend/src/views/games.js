import { Component, Fragment } from "react";

class Games extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {


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
                                            <p style={{ fontSize: "30px" }}> 45 </p>
                                            <h1> <i> Veces jugadas </i> </h1>
                                            <p style={{ fontSize: "30px" }}> 45 </p>
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
                                            <p style={{ fontSize: "30px" }}> 45 </p>
                                            <h1> <i> Veces jugadas </i> </h1>
                                            <p style={{ fontSize: "30px" }}> 45 </p>
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
                                            <p style={{ fontSize: "30px" }}> 45 </p>
                                            <h1> <i> Veces jugadas </i> </h1>
                                            <p style={{ fontSize: "30px" }}> 45 </p>
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
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ fontSize: "25px" }}> 50 </td>
                                <td style={{ fontSize: "25px" }}> 78 </td>
                                <td style={{ fontSize: "25px" }}> Juego Uno </td>
                                <td style={{ fontSize: "25px" }}> Juan </td>
                                <td style={{ fontSize: "25px" }}> 888 </td>
                            </tr>
                        </tbody>

                    </table>
                </div>

            </Fragment>
        )
    }

}

export default Games