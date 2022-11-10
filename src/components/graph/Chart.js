import React , {Component} from 'react';
import Chart from 'react-apexcharts'

class PopChart extends Component {
    constructor(props) {
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
                data: [31, 40, 28, 51, 42, 109, 100]
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
            width="700"
        />;
    }
}

export default PopChart;








// const Graph = () => {
//     const [options, setObject] = useState({   
//     options: {
//             chart: {
//               height: 350,
//               type: 'area'
//             },
//             dataLabels: {
//               enabled: false
//             },
//             stroke: {
//               curve: 'smooth'
//             },
//             xaxis: {
//               type: 'datetime',
//               categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
//             }
//     })
//     const [series, seSeries] = useState([{
//         series: [{
//             name: 'series1',
//             data: [31, 40, 28, 51, 42, 109, 100]
//           }, {
//             name: 'series2',
//             data: [11, 32, 45, 32, 34, 52, 41]
//           }],
//     }])
//       return (
//       <Chart options={options} series={series} type="area" height={350} />
//       )
         
// }

// export default Graph