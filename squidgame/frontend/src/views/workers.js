import { Component, Fragment } from 'react'
import DonutChart from '../components/donutGraph';
import LinealGraph from '../components/linealGraph';

class Workers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            series: [0],
            kafka: [0],
            rabbit: [0],
            pubsub: [0],
            countPubSub: 33,
            countRabbit: 33,
            countKafka: 33
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

            this.state.countKafka += 1;
            this.setState({
                pubsub: [...this.state.pubsub, 0],
                kafka: [...this.state.kafka, count],
                rabbit: [...this.state.rabbit, 0],
                count: count
            })
        }
        else if (split <= 0.66) {

            this.state.countRabbit += 1;
            this.setState({
                pubsub: [...this.state.pubsub, 0],
                kafka: [...this.state.kafka, 0],
                rabbit: [...this.state.rabbit, count],
                count: count
            })
        }
        else {
            this.state.countPubSub += 1;
            this.setState({
                pubsub: [...this.state.pubsub, count],
                kafka: [...this.state.kafka, 0],
                rabbit: [...this.state.rabbit, 0],
                count: count
            })
        }

        console.log(this.state)
    }

    render() {

        return (


            <Fragment>

                <div className="btn btn-danger" onClick={this.addToWorker}>
                    Agregar
                </div>

                <div className="row">

                    <div className="col">
                        <div className="card card-body">
                            <div className="card-header">
                                <p className="h1" style={{ fontSize: "30px" }}>
                                    Google Pub/Sub
                                </p>
                            </div>
                            <div className="card-body">

                                <div key={Math.random()}>
                                    <LinealGraph data={this.state.pubsub} height={200} width={500} max={100} />
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="col">
                        <div className="card card-body">
                            <div className="card-header">
                                <p className="h1" style={{ fontSize: "30px" }}>
                                    kafka
                                </p>
                            </div>
                            <div className="card-body">

                                <div key={Math.random()}>
                                    <LinealGraph data={this.state.kafka} height={200} width={500} max={100} />
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="col">
                        <div className="card card-body">
                            <div className="card-header">
                                <p className="h1" style={{ fontSize: "30px" }}>
                                    Rabiit MQ
                                </p>
                            </div>
                            <div className="card-body">

                                <div key={Math.random()}>
                                    <LinealGraph data={this.state.rabbit} height={200} width={500} max={100} />
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

                <div className="card" style={{ backgroundColor: "#126324", marginTop: "25px" }}>

                    <div className="row">

                        <div className="col">
                            <div key={Math.random()}>
                                <DonutChart
                                    series={
                                        [this.state.countKafka / this.state.count,
                                        this.state.countPubSub / this.state.count,
                                        this.state.countRabbit / this.state.count]}
                                    width={300}
                                />
                            </div>
                        </div>

                    </div>

                </div>

            </Fragment>

        )

    }

}


export default Workers