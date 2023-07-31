import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import { orderNumMap } from '../../utils/map';
import './index.scss'

export default function OrderPie1(props) {
  const { data } = props
  var chartDom
  var myChart
  let option = {
    title: {
      text: '付款方式占比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: '70%',
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  useEffect(() => {
    data.map(item => {
      item.name = orderNumMap[item.type]
    })
    chartDom = document.querySelector('#orderpie1')
    myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
  }, [])

  return (
    <div id='orderpie1'></div>
  )
}



