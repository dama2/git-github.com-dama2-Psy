import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import { commentMap } from '../../utils/map';
import './index.scss'

export default function CommentPie(props) {
  const { data } = props

  var chartDom
  var myChart
  let option = {
    title: {
      text: '评论分布',
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
        type: 'pie',
        radius: '70%',
        data: data,
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
      item.name = commentMap[item.type]
    })
    chartDom = document.querySelector('#commentpie')
    myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
  }, [])

  return (
    <div id='commentpie'></div>
  )
}



