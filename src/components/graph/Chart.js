import React , {Component} from 'react';
import Chart from 'react-apexcharts'
// import {useUrlTheme} from '../../context/Urls'

class PopChart extends Component {
    constructor(props) {
        // const {url_list, url } = useUrlTheme()

        // for url in url_list
        // get the url.likes
        // make the array with it

        super(props);
        this.state = {
            options: {
                chart: {
                    background: '#f4f4f4',
                    foreColor: '#333'
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    xaxis: {
                        type: 'datetime',
                        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
                    },
                    tooltip: {
                        x: {
                            format: 'dd/MM/yy HH:mm'
                        }
                    }
                },
                series: [{
                    name: 'Likes',
                    data: [31, 40, 28, 51, 42, 109, 100] //data = created array.
                }, {
                    name: 'Views',
                    data: [11, 32, 45, 32, 34, 52, 41]
                }, {
                    name: 'Sales Revenue',
                    data: [10, 25, 45, 55, 73, 80, 84]
                }
            ]
        }
    }

    render () {
        return <Chart
            options={this.state.options}
            series={this.state.series}
            type="area"
            height="550"
            width="800"
        />;
    }
}

export default PopChart;





