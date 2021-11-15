import { Component, Fragment } from "react";

class Players extends Component {

    constructor(props) {
        super(props)
        this.state = {
            screen: 1024,
            selectedPlayer: null
        }


        this.selectPlayer = this.selectPlayer.bind(this)
    }


    componentDidMount() {
        console.log(window.screen.width)
        this.setState({ screen: window.screen.width })

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
                                        this.state.selectedPlayer !== null &&
                                        <div>
                                            <div className="card-header">
                                                <h1>
                                                    Player #45645
                                                </h1>
                                            </div>
                                            <div className="card-body">

                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-8" style={{ padding: "10px" }} >

                            <div className="fluid-container card card-body" style={{ borderStyle: "solid", borderColor: "white", borderRadius: "5px", backgroundColor: "#1a4a24", marginBottom: "20px" }}>
                                <div className="row">
                                    <div className="col-3">
                                        <div className="btn btn-outline-success" style={{ borderColor: "black", borderStyle: "solid", textAlign: "center" }} onClick={() => this.selectPlayer()}>
                                            <strong>
                                                <p className="h1" style={{ fontSize: "60px", color: "white" }} >002</p>
                                            </strong>
                                        </div>
                                    </div>
                                    <div className="col-9">
                                        <div className="row">
                                            <div className="col" style={{ textAlign: "center" }}>
                                                <h3><i>Ultimo Juego</i></h3>
                                                <p className="h1" style={{ fontSize: "50px" }}>
                                                    Game 15
                                                </p>
                                            </div>
                                            <div className="col" style={{ textAlign: "center" }}>
                                                <h3><i>Juegos ganados</i></h3>
                                                <div className="card card body bg-danger">
                                                    <p className="h1" style={{ fontSize: "50px" }}>
                                                        15
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>

            </Fragment >

        )

    }

}

export default Players