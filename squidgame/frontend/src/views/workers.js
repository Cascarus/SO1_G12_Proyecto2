import { Component, Fragment } from 'react'
import DonutChart from '../components/donutGraph';
import LinealGraph from '../components/linealGraph';

class Workers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            counts: [0, 0, 0],
            kafka: [0],
            rabbit: [0],
            pubsub: [0],
            countPubSub: 0,
            countRabbit: 0,
            countKafka: 0
        }

        this.addToWorker = this.addToWorker.bind(this)
    }

    addToWorker() {

        var count = this.state.count + 1

        if (count / 10 >= 1) {

            this.state.pubsub.shift()
            this.state.kafka.shift()
            this.state.rabbit.shift()
        }

        var split = Math.random()

        if (split <= 0.33) {

            let t = this.state.countKafka + 1

            this.setState({
                pubsub: [...this.state.pubsub, 0],
                kafka: [...this.state.kafka, t],
                rabbit: [...this.state.rabbit, 0],
                countKafka: t,
                count: count
            })
        }
        else if (split <= 0.66) {

            let t = this.state.countRabbit + 1

            this.setState({
                pubsub: [...this.state.pubsub, 0],
                kafka: [...this.state.kafka, 0],
                rabbit: [...this.state.rabbit, t],
                countRabbit: t,
                count: count
            })
        }
        else {

            let t = this.state.countPubSub + 1

            this.setState({
                pubsub: [...this.state.pubsub, t],
                kafka: [...this.state.kafka, 0],
                rabbit: [...this.state.rabbit, 0],
                countPubSub: t,
                count: count
            })
        }
    }

    render() {

        return (


            <Fragment>

                <div className="btn btn-danger" onClick={this.addToWorker}>
                    Agregar
                </div>

                <div className="row">

                    <div className="col">
                        <div className="card card-body" >
                            <div className="card-header bg-primary">
                                <p className="h1" style={{ fontSize: "30px" }}>
                                    Google Pub/Sub
                                </p>
                            </div>
                            <div className="card-body d-flex justify-content-evenly">

                                <div key={Math.random()}>
                                    <LinealGraph data={this.state.pubsub} height={200} width={500} max={100} />
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="col ">
                        <div className="card card-body">
                            <div className="card-header bg-success">
                                <p className="h1" style={{ fontSize: "30px" }}>
                                    kafka
                                </p>
                            </div>
                            <div className="card-body d-flex justify-content-evenly">

                                <div key={Math.random()}>
                                    <LinealGraph data={this.state.kafka} height={200} width={500} max={100} />
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="col">
                        <div className="card card-body">
                            <div className="card-header bg-warning">
                                <p className="h1" style={{ fontSize: "30px", color: "black" }}>
                                    Rabiit MQ
                                </p>
                            </div>
                            <div className="card-body d-flex justify-content-evenly">

                                <div key={Math.random()}>
                                    <LinealGraph data={this.state.rabbit} height={200} width={500} max={100} />
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

                <div className="card" style={{ marginTop: "25px", backgroundColor: "#0f2537" }}>

                    <div className="row" style={{ paddingLeft: "50px", paddingRight: "50px" }}>

                        <div className="col d-flex justify-content-evenly" style={{ paddingTop: "30px" }}>
                            <div key={Math.random()}>
                                <DonutChart
                                    series={
                                        [this.state.countKafka / this.state.count,
                                        this.state.countPubSub / this.state.count,
                                        this.state.countRabbit / this.state.count]}
                                    width={500}
                                />
                            </div>
                        </div>

                        <div className="col" >


                            <div className="row alert alert-primary" >
                                <h1 className="alert-heading" style={{ fontSize: 30 }} >Google Pub/Sub</h1>
                                <hr />
                                <p className="h1" style={{ fontSize: 40 }} > {this.state.countPubSub} </p>
                            </div>

                            <div className="row alert alert-success" >
                                <h1 className="alert-heading" style={{ fontSize: 30 }} >Kafka</h1>
                                <hr />
                                <p className="h1" style={{ fontSize: 40 }} > {this.state.countKafka} </p>
                            </div>

                            <div className="row alert alert-warning" style={{ color: "black" }} >
                                <h1 className="alert-heading" style={{ fontSize: 30 }} >Rabbit MQ</h1>
                                <hr />
                                <p className="h1" style={{ fontSize: 40 }} > {this.state.countRabbit} </p>
                            </div>


                        </div>

                    </div>

                </div>

            </Fragment>

        )

    }

}


export default Workers