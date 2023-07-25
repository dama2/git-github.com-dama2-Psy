import { Button, Col, Row, Statistic } from 'antd';
import React, { useEffect, useState, useRef } from 'react'
import * as echarts from 'echarts';
import { transaction } from '../../utils/table';
import './index.scss';
import TableRolling from '../../components/RollingTable';
import { getAllTransRecord } from '../../api/trans';


export default function Monitor() {
  var flag = true
  var rollTime = 80
  var rollNum = 50
  var rollTop = 2
  // 图表定时器, 交易金额定时器
  var timer2
  // 交易数据展示
  const [timer1, setTimer] = useState()

  // 列表数据
  const [data, setData] = useState([])
  // 总交易金额
  const [total, setTotal] = useState(0)
  // 拦截金额
  const [interception, setInterception] = useState(0)
  // 总交易笔数
  const [totalTrans, setTotalTrans] = useState(0)
  // 拦截交易数量
  const [fruadTrans, setFruadTrans] = useState(0)

  const [time, setTime] = useState(0)

  //  每一千条数据，更新一次
  var changeNum = 1000

  var chartDom
  var myChart
  // 第一次获取表格数据
  useEffect(() => {
    getAllTransRecord({ key: '1' }).then(value => {
      setData(value)
    })
  }, [])
  const data1 = []
  const data2 = []
  const categories2 = (function () {
    let res = [];
    let len = 10;
    while (len--) {
      res.push(10 - len - 1);
    }
    return res;
  })();

  let option = {
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
    // x轴是否可以拖拽
    dataZoom: {
      show: false,
      start: 0,
      end: 100
    },
    xAxis: [
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
        name: '交易量',
        max: 1000,
        min: 0,
        boundaryGap: [0.2, 0.2]
      },
    ],
    series: [
      {
        name: '正常交易',
        type: 'bar',
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
    clearInterval(timer1)
    let v = document.getElementsByClassName('virtual-grid')[0];
    if (data.length > rollNum && flag) {
      // 只有当大于10条数据的时候 才会看起滚动
      let timer = setInterval(() => {
        v.scrollTop += Number(rollTop);
      }, rollTime);
      setTimer(timer); // 定时器保存变量 利于停止
    }
  };

  // 展示现在交易详情
  const dynamicShow = () => {
    clearInterval(timer2)
    timer2 = setInterval(function () {
      var temp = data.slice(changeNum * time, changeNum * (time + 1))
      var totalTemp = 0
      var interceptionTemp = 0
      var fruadTransTemp = 0
      temp.forEach((item, index) => {
        totalTemp += item.price
        if (item.label === 1) {
          interceptionTemp += item.price
          fruadTransTemp++
        }
      })

      setTotal(total + totalTemp)
      setTotalTrans(changeNum * (time + 1))
      setInterception(interception + interceptionTemp)
      setFruadTrans(fruadTrans + fruadTransTemp)
      setTime(time + 1)

      if (data1.length > 10) {
        data1.shift();
        data2.shift(); 
        categories2.shift();
        categories2.push(app.count++);
      }
      data1.push(1000 - fruadTransTemp);
      data2.push(fruadTransTemp);



      
      myChart.setOption({
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: categories2,
            show: false
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
    }, 5000);
  }

  useEffect(() => {
    InitialScroll()
    chartDom = document.querySelector('#echarts-trans');
    myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    dynamicShow()
    return () => {
      clearInterval(timer2)
      clearInterval(timer1)
    }
  }, [data, total])

  return (
    <div className='monitorContent'>

      {/* 全局交易监控 */}
      <div className='transaction'>
        <h4>实时订单信息</h4>
        {/* 动态表格 */}
        <div onMouseLeave={() => { InitialScroll(); }}
          onMouseEnter={() => { clearInterval(timer1); }}>
          <TableRolling
            columns={transaction}
            dataSource={data}
            scroll={{
              y: 760,
            }} />
        </div>

      </div>
      {/* 统计数据 */}
      <div className='staticInfo'>
        <h4>统计信息</h4>
        <div className='content'>
          <div className='total'>
            <div className='detail' >
              <Statistic title="交易金额" value={total} precision={2} />
              <Statistic title="拦截金额" value={interception} precision={2} />
            </div>
            <div className='detail'>
              <Statistic title="交易笔数" value={totalTrans} />
              <Statistic title="拦截笔数" value={fruadTrans} />
            </div>
          </div>
          <div id='echarts-trans'>
          </div>

        </div>


      </div>

    </div>
  )
}
