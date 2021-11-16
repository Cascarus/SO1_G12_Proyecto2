import { Component } from 'react';
import Chart from 'react-apexcharts'

class DonutChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                legend: {
                    show: true,
                    fontSize: '20px',
                    labels: {
                        colors: ["white"],
                        useSeriesColors: false
                    },
                },
                tooltip: {
                    y: {
                        formatter: undefined,
                        title: {
                            formatter: (seriesName) => seriesName,
                        },
                    }
                },
                dataLabels: {
                    style: {
                        fontSize: '20px',
                        colors: ["white"]
                    }
                },
                labels: ['PubSub', 'Kafka', 'RabbitMQ']
            },
            series: [33, 33, 33],
        }
    }

    componentDidMount() {

        this.setState({ series: this.props.series, width: this.props.width })

    }

    render() {

        return (
            <div className="donut">
                <Chart options={this.state.options} series={this.state.series} type="donut" width={this.props.width} />
            </div>
        );
    }
}

export default DonutChart