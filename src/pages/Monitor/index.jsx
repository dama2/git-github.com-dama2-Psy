import { Button, Col, Row, Statistic } from 'antd';
import React, { useEffect, useState, useRef } from 'react'
import * as echarts from 'echarts';
import { transaction } from '../../utils/table';
import './index.scss';
import TableRolling from '../../components/RollingTable';


export default function Monitor() {
  var flag = true
  var rollTime = 80
  var rollNum = 50
  var rollTop = 1.5
  const [timer, setTimer] = useState()
  // 列表数据
  const data = new Array(10000).fill({
    u_id: 200,
    sku_id: 200,
    date: '2002/01/01',
    price: 10,
    cate: 10,
    label: 0
  })
  const total = useRef(0)
  var chartDom
  var myChart
  var option;
  useEffect(() => {
    chartDom = document.querySelector('#echarts-trans');
    console.log(chartDom)
    myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    var timer1 = setInterval(function () {
      let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
      data1.shift();
      data1.push(Math.round(Math.random() * 1000));
      data2.shift();
      data2.push(+(Math.random() * 10 + 5).toFixed(1));
      categories.shift();
      categories.push(axisData);
      categories2.shift();
      categories2.push(app.count++);
      myChart.setOption({
        xAxis: [
          {
            data: categories
          },
          {
            data: categories2
          }
        ],
        series: [
          {
            data: data1
          },
          {
            data: data2
          }
        ]
      });
    }, 2100);
  }, [])



  const categories = (function () {
    let now = new Date();
    let res = [];
    let len = 10;
    while (len--) {
      res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
      now = new Date(+now - 2000);
    }
    return res;
  })();
  const categories2 = (function () {
    let res = [];
    let len = 10;
    while (len--) {
      res.push(10 - len - 1);
    }
    return res;
  })();
  const data1 = (function () {
    let res = [];
    let len = 10;
    while (len--) {
      res.push(Math.round(Math.random() * 1000));
    }
    return res;
  })();
  const data2 = (function () {
    let res = [];
    let len = 0;
    while (len < 10) {
      res.push(+(Math.random() * 10 + 5).toFixed(1));
      len++;
    }
    return res;
  })();
  option = {
    title: {
      text: '实时拦截放行'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56'
        }
      }
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: categories
      },
      {
        type: 'category',
        boundaryGap: true,
        data: categories2
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        name: 'Price',
        max: 30,
        min: 0,
        boundaryGap: [0.2, 0.2]
      },
      {
        type: 'value',
        scale: true,
        name: 'Order',
        max: 1200,
        min: 0,
        boundaryGap: [0.2, 0.2]
      }
    ],
    series: [
      {
        name: '正常交易',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data1
      },
      {
        name: '异常交易',
        type: 'line',
        data: data2
      }
    ]
  };
  var app = {}
  app.count = 11;

  // 使列表可以动态加载
  const InitialScroll = () => {
    let v = document.getElementsByClassName('virtual-grid')[0];
    if (data.length > rollNum && flag) {
      // 只有当大于10条数据的时候 才会看起滚动
      let time = setInterval(() => {
        v.scrollTop += Number(rollTop);
        // setTotal(total+10)
        total.current += 10
      }, rollTime);
      setTimer(time); // 定时器保存变量 利于停止
    }
  };



  useEffect(() => {
    InitialScroll()
    return () => clearInterval(timer)
  }, [])
  return (
    <div className='monitorContent'>

      {/* 全局交易监控 */}
      <div className='transaction'>
        <h4>实时订单信息</h4>
        {/* 动态表格 */}
        <div onMouseLeave={() => { InitialScroll(); }}
          onMouseEnter={() => { clearInterval(timer); }}>
          <TableRolling
            columns={transaction}
            dataSource={data}
            scroll={{
              y: 770,
            }} />
        </div>


      </div>
      {/* 统计数据 */}
      <div className='staticInfo'>
        <h4>统计信息</h4>
        <div className='content'>
          <div className='total'>
            <div className='detail' >
              <Statistic title="交易金额" value={total.current} precision={2} />
              <Statistic title="拦截金额" value={112893} precision={2} color='red' />
            </div>
            <div className='detail'>
              <Statistic title="交易笔数" value={112893} />
              <Statistic title="拦截笔数" value={112893} />
            </div>
          </div>
          <div id='echarts-trans'>
          </div>

        </div>


      </div>

    </div>
  )
}
