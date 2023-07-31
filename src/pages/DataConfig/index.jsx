import React, { useEffect, useState } from 'react'
import {  Table, message} from 'antd';
import './index.scss';
import { dataShow } from '../../utils/table';
import {getAllDataSet } from '../../api/data';
import DataDetail from '../DataDetail';





export default function DataConfig() {
  // 表格数据
  const [data, setData] = useState([])
  // 是否正在加载
  const [loading, setLoading] = useState(false);
  
  // 详情页面是否展示
  const [showDetail, setShowDeatil] = useState(false)
  // 展示那个数据集的详情
  const [fileID, setfileID] = useState(null)
  // 用户点击查看那个表格的内容

  // 获取overview表格中的数据
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
  // overview数据集的属性
  const colums = dataShow(handleDetail, handleDwoload, handleDelte)
  // 切换表格


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
      {showDetail ? <DataDetail fileID={fileID}/> : ''}

    </>
  )
}


