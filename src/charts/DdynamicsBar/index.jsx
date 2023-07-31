import React, { useEffect } from 'react'
import * as echarts from 'echarts';

export default function DdynamicsBar() {
    console.log('123')
    let payTypeChart
    const data = [];
    for (let i = 0; i < 5; ++i) {
        data.push(Math.round(Math.random() * 200));
    }

    function run() {
        // for (var i = 0; i < data.length; ++i) {
        //     if (Math.random() > 0.9) {
        //         data[i] += Math.round(Math.random() * 2000);
        //     } else {
        //         data[i] += Math.round(Math.random() * 200);
        //     }
        // }
        payTypeChart.setOption({
            series: [
                {
                    type: 'bar',
                    data
                }
            ]
        });
    }

    useEffect(() => {
        payTypeChart = echarts.getInstanceByDom(
            document.querySelector('#monitor-payType')
        )
        if (payTypeChart == null) {
            payTypeChart = echarts.init(document.querySelector('#monitor-payType'));
            option && payTypeChart.setOption(option);
        }
    }, [])
    setTimeout(function () {
        run();
    }, 0);
    // setInterval(function () {
    //     run();
    // }, 3000);
    return (
        <div id='monitor-payType'></div>
    )
}
