import React, { useEffect, useState } from 'react'
import { Statistic, Table, message, Row, Col, Card } from 'antd';
import './index.scss';
import { dataShow } from '../../utils/table';
import { getAllDataSet } from '../../api/data';


export default function DataConfig() {
  // 表格数据
  const [data, setData] = useState([])
  // 是否正在加载
  const [loading, setLoading] = useState(false);
  // 获取表格数据
  const fenthData = () => {
    setLoading(true)
    getAllDataSet().then(value => {
      setData(value)
      setLoading(false)
    })
  }
  useEffect(() => {
    fenthData()
  }, [])
  // 删除数据
  const handleDelte = (id) => {
    console.log(id)

  }
  const handleDwoload = (id) => {
    message.success(`已下载${id}文件`)
  }

  // 查看详情数据集
  const handleDetail = (id) => {
    setShowDeatil(true)
    setfileID(id)
  }
  // 
  const colums = dataShow(handleDetail, handleDwoload, handleDelte)
  // 详情页面是否展示
  const [showDetail, setShowDeatil] = useState(false)
  // 展示那个数据集的详情
  const [fileID, setfileID] = useState(null)
  // 用户点击了详情页面，保存要查看那个详情页面
  
  return (
    <>
      <div className='dataconfig' style={{ display: showDetail ? 'none' : '' }}>
        <Table
          columns={colums}
          dataSource={data}
          scroll={{ y: 'calc(100vh - 190px)' }}
          loading={loading}
        />
      </div>
      <div className='detail' style={{ display: showDetail ? '' : 'none' }}>
        <Card title='action' className='card'>
          <Statistic title="数量" value={112893} valueStyle={{color:'red'}}/>
        </Card>
        <Card title='sku' className='card'>
          <Statistic title="数量" value={112893} />
        </Card>
        <Card title='comment' className='card'>
          <Statistic title="数量" value={112893} />
        </Card>
        <Card title='order' className='card'>
          <Statistic title="数量" value={112893} />
        </Card>
      </div>
    </>
  )
}


