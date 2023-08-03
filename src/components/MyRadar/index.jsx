import React, { useEffect } from 'react'
import * as echarts from 'echarts';
import './index.scss'

export default function MyRadar(props) {
  console.log(props)
  var radarChart
  useEffect(() => {
    radarChart = echarts.getInstanceByDom(
      document.querySelector('#radarChart')
    )
    if (radarChart == null)
      radarChart = echarts.init(document.querySelector('#radarChart'));
    option && radarChart.setOption(option);
  }, [props])

  var option = {
    legend: {},
    tooltip: {
      show: true //显示提示框
    },
    radar: [
      {
        indicator: props.radarData.indicator,
        center: ['50%', '50%'],
        radius: 120,
        startAngle: 90,
        splitNumber: 4,
        shape: 'circle',
        axisName: {
          formatter: '【{value}】',
          color: '#428BD4'
        },
        splitArea: {
          areaStyle: {
            color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 10
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(211, 253, 250, 0.8)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(211, 253, 250, 0.8)'
          }
        }
      },
    ],
    series: [
      {
        type: 'radar',
        emphasis: {
          lineStyle: {
            width: 4
          }
        },
        data: [
          {
            value: props.radarData.data1,
            name: '正常交易'
          },
          {
            value: props.radarData.data2,
            name: '当前交易',
            areaStyle: {
              color: 'rgba(255, 228, 52, 0.6)'
            }
          }
        ]
      },
    ],

  };
  return (
    <div id='radarChart'></div>
  )
}
