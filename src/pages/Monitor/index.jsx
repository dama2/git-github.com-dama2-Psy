import { Statistic } from 'antd';
import React, { useEffect, useState, useRef } from 'react'
import * as echarts from 'echarts';
import { dataShow, transaction } from '../../utils/table';
import './index.scss';
import TableRolling from '../../components/RollingTable';
import { getAllTransRecord, getStaticsInfo } from '../../api/trans';
import { transOption, payTypeOption, areaNameOption, moneyOption, cateNameOption } from './chartOption';

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

  const payTypeData = [0, 0, 0, 0, 0];
  const areaNameData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const cateNameData = [0, 0, 0, 0, 0, 0]
  const data1 = [0, 0, 0, 0, 0, 0, 0,]
  const data2 = [0, 0, 0, 0, 0, 0, 0,]
  const categories = [0, 0, 0, 0, 0, 0, 0,]
  const categories2 = [0, 0, 0, 0, 0, 0, 0]

  const moneydata1 = [0, 0, 0, 0, 0, 0, 0]
  const moneyData2 = [0, 0, 0, 0, 0, 0, 0]


  let current = 0

  let transEchart, payTypeChart, areaNameChart, moneyChart, cateNameChart



  var app = { count: 1 }

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
        moneydata1.shift()
        moneydata1.push(value.avgNormalMoney)
        moneyData2.shift()
        moneyData2.push(value.avgFraudMoney)
        moneyChart.setOption({
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
              data: moneydata1
            },
            {
              data: moneyData2
            }
          ]
        })

        // 地区分布
        for (let i in value.area) {
          areaNameData[i] = areaNameData[i] + value.area[i]
        }
        areaNameChart.setOption({
          series: [
            {
              type: 'bar',
              data: areaNameData
            }
          ]
        });
        // 付款方式
        for (let i in value.payType) {
          payTypeData[i] = payTypeData[i] + value.payType[i]
        }
        payTypeChart.setOption({
          series: [
            {
              type: 'bar',
              data: payTypeData
            }
          ]
        });
        // 付款方式
        for (let i in value.cate) {
          cateNameData[i] = cateNameData[i] + value.cate[i]
        }
        cateNameChart.setOption({
          series: [
            {
              type: 'bar',
              data: cateNameData
            }
          ]
        });
      })
    }, 3000)
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
    areaNameChart = echarts.getInstanceByDom(
      document.querySelector('#monitor-areaName')
    )
    moneyChart = echarts.getInstanceByDom(
      document.querySelector('#echarts-money')
    )
    cateNameChart = echarts.getInstanceByDom(
      document.querySelector('#monitor-cateName')
    )

    if (transEchart == null) {
      transEchart = echarts.init(document.querySelector('#echarts-trans'));
      transOption && transEchart.setOption(transOption);
    }
    if (payTypeChart == null) {
      payTypeChart = echarts.init(document.querySelector('#monitor-payType'));
      payTypeOption && payTypeChart.setOption(payTypeOption);
    }
    if (areaNameChart == null) {
      areaNameChart = echarts.init(document.querySelector('#monitor-areaName'));
      areaNameOption && areaNameChart.setOption(areaNameOption);
    }
    if (moneyChart == null) {
      moneyChart = echarts.init(document.querySelector('#echarts-money'));
      moneyOption && moneyChart.setOption(moneyOption);
    }
    if (cateNameChart == null) {
      cateNameChart = echarts.init(document.querySelector('#monitor-cateName'));
      cateNameOption && cateNameChart.setOption(cateNameOption);
    }
  }, [data])


  return (
    <div className='monitorContent'>

      {/* 交易数量以及交易金额统计 */}
      <div className='left'>
        <div id='echarts-trans'></div>
        <div id='echarts-money'></div>


      </div>

      {/* 全局交易监控 */}
      <div className='center'>
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
        {/* 动态表格 */}
        <div onMouseLeave={() => { InitialScroll(); }} className='table'
          onMouseEnter={() => { clearInterval(timer1); }}>
          <TableRolling
            columns={transaction}
            dataSource={data}
            scroll={{
              y: 700,
            }} />
        </div>

      </div>

      {/* 交易其他分布 */}
      <div className='right'>
        <div id='monitor-payType'></div>
        <div id='monitor-areaName'></div>
        <div id='monitor-cateName'></div>
      </div>


    </div>
  )
}
