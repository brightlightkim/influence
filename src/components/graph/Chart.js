import React from 'react';
import Chart from 'react-apexcharts'
import {useUrlTheme} from '../../context/Urls'

export default function PopChart() {
    const {url_list, url } = useUrlTheme()
    var likesArr = []
    for (let i = 0; i < url_list.length; i++){
        likesArr.push(url_list[i].likes)
    }
    // for url in url_list
    // get the url.likes
    // make the array with it
    var options = {
        chart: {
            background: 'black',
            foreColor: 'white'
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
    }

    var series = [{
        name: 'Likes',
        data: likesArr //data = created array.
    }, {
        name: 'Views',
        data: [11, 32, 45, 32, 34, 52, 41]
    }, {
        name: 'Sales Revenue',
        data: [10, 25, 45, 55, 73, 80, 84]
    }]

    return(
        <Chart
            options={options}
            series={series}
            type="area"
            height="400"
            width="600"
        />
    )
}





