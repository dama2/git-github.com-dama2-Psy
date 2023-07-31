import { Statistic } from 'antd';
import React, { useEffect, useState, useRef } from 'react'
import * as echarts from 'echarts';
import { dataShow, transaction } from '../../utils/table';
import './index.scss';
import TableRolling from '../../components/RollingTable';
import { getAllTransRecord, getStaticsInfo } from '../../api/trans';

export default function Monitor() {
  var flag = true
  var rollTime = 80
  var rollNum = 50
  var rollTop = 2

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

  const payTypeData = [0,0,0,0,0];

  let current = 0

  let transEchart, payTypeChart

  const data1 = [0, 0, 0, 0, 0, 0, 0,]
  const data2 = [0, 0, 0, 0, 0, 0, 0,]
  const categories = [0, 0, 0, 0, 0, 0, 0,]
  const categories2 = [0, 0, 0, 0, 0, 0, 0]

  let transOption = {
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

  let payTypeOption = {
    xAxis: {
      max: 'dataMax'
    },
    yAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E'],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: 2 // only the largest 3 bars will be displayed
    },
    series: [
      {
        realtimeSort: true,
        name: 'X',
        type: 'bar',
        data: payTypeData,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true
        }
      }
    ],
    legend: {
      show: true
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  };
  var app = {}
  app.count = 0;

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

  // 第一次获取表格数据
  useState(() => {
    getAllTransRecord({ key: '02f6ba20_1ffc_4840_8ee5_ca95b2c75ca4' }).then(value => {
      setData(value)
    })
    // countRef.current=count
  }, [])

  useEffect(() => {
    // 更新交易总额度 以及实时拦截信息
    let id = setInterval(() => {
      getStaticsInfo({ key: '02f6ba20_1ffc_4840_8ee5_ca95b2c75ca4', count: current }).then(value => {
        current = current + value.rand
        setTotal(total => value.total + total)
        setTotalTrans(totalTrans => totalTrans + value.rand)
        setInterception(fraudTotal => fraudTotal + value.fraudTotal)
        setFruadTrans(fruadTrans => fruadTrans + value.fraudTrans)

        let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
        data1.shift();
        data1.push(value.normalTrans);
        data2.shift();
        data2.push(value.fraudTrans);
        categories.shift();
        categories.push(axisData);
        categories2.shift();
        categories2.push(app.count++);
        transEchart.setOption({
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
        })
        run()
      })
    }, 30000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    InitialScroll()
    transEchart = echarts.getInstanceByDom(
      document.querySelector('#echarts-trans')
    );
    payTypeChart = echarts.getInstanceByDom(
      document.querySelector('#monitor-payType')
    )
    if (transEchart == null) {
      transEchart = echarts.init(document.querySelector('#echarts-trans'));
      transOption && transEchart.setOption(transOption);
    }
    if (payTypeChart == null) {
      payTypeChart = echarts.init(document.querySelector('#monitor-payType'));
      payTypeOption && payTypeChart.setOption(payTypeOption);
    }
  }, [data])

  function run() {
    for (var i = 0; i < payTypeData.length; ++i) {
      if (Math.random() > 0.9) {
        payTypeData[i] += Math.round(Math.random() * 2000);
      } else {
        payTypeData[i] += Math.round(Math.random() * 200);
      }
    }
    console.log('da')
    payTypeChart.setOption({
      series: [
        {
          type: 'bar',
          data:payTypeData
        }
      ]
    });
  }

  return (
    <div className='monitorContent'>

      {/* 交易数量以及交易金额统计 */}
      <div className='left'>
        <h4>统计信息</h4>
        <div className='content'>
          <div className='total'>
            <div className='detail' >
              <Statistic title="交易金额" value={total} precision={2} />
              <Statistic title="拦截金额" value={interception} precision={2} />
            </div>
            <div className='detail'>
              <Statistic title="交易量" value={totalTrans} />
              <Statistic title="拦截量" value={fruadTrans} />
            </div>
          </div>
          <div id='echarts-trans'>
          </div>

        </div>


      </div>

      {/* 全局交易监控 */}
      <div className='center'>
        <h4>实时订单信息</h4>
        {/* 动态表格 */}
        <div onMouseLeave={() => { InitialScroll(); }} className='table'
          onMouseEnter={() => { clearInterval(timer1); }}>
          <TableRolling
            columns={transaction}
            dataSource={data}
            scroll={{
              y: 630,
            }} />
        </div>

      </div>

      {/* 交易其他分布 */}
      <div className='right'>
        <div id='monitor-payType'></div>


      </div>


    </div>
  )
}
