
import React, { useEffect, useState,useRef } from 'react'
import { transaction } from '../../utils/table';
import './index.scss';
import TableRolling from '../../components/TableRolling';
import { Button, Col, Row, Statistic } from 'antd';

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
  const total=useRef(0)
  // 使列表可以动态加载
  const InitialScroll = () => {
    let v = document.getElementsByClassName('virtual-grid')[0];
    if (data.length > rollNum && flag) {
      // 只有当大于10条数据的时候 才会看起滚动
      let time = setInterval(() => {
        v.scrollTop += Number(rollTop);
        // setTotal(total+10)
        total.current+=10
      }, rollTime);
      setTimer(time); // 定时器保存变量 利于停止
    }
  };

  useEffect(() =>{
    InitialScroll()
    return ()=> clearInterval(timer)
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
              y: 'calc(100vh-200px)',
            }} />
        </div>


      </div>
      {/* 统计数据 */}
      <div className='staticInfo'>
        <h4>统计信息</h4>
        <div className='total'>
          <div className='detail' >
            <Statistic title="交易金额" value={total.current} precision={2}/>
            <Statistic title="拦截金额" value={112893} precision={2} />
          </div>
          <div className='detail'>
            <Statistic title="交易笔数" value={112893} />
            <Statistic title="拦截笔数" value={112893} />
          </div>
        </div>


      </div>

    </div>
  )
}
