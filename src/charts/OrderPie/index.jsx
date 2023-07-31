import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as echarts from 'echarts';
import { commentMap, orderNumMap } from '../../utils/map';
import './index.scss'

export default function OrderPie(props) {
  const { data } = props
  var chartDom
  var myChart
  let option = {
    title: {
      text: 'test',
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
      item.name = 'fsf'
    })
    chartDom = document.querySelector('#orderpie')
    myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
  }, [])

  return (
    <div id='orderpie'></div>
  )
}



