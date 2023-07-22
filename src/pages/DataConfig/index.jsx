import React, { useEffect, useState } from 'react'
import { Button, Table, message } from 'antd';
import './index.scss';
import { dataShow } from '../../utils/table';
import { getAllDataSet } from '../../api/data';



export default function DataConfig() {
  const [data,setData]=useState([])
  useEffect(()=>{
    getAllDataSet().then(value=>setData(value))

  },[])
  const colums = [...dataShow, {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (item) => <Button className='standard-main-btn' onClick={() => handleSelectd(item.id)}>使用</Button>
  }]
  // 选定某个数据集
  const handleSelectd = (id) => {
    message.success(`已选择${id}文件`)
  }
  return (
    <div className='dataconfig'>
      <Table
        columns={colums}
        dataSource={data}
        scroll={{ y: 'calc(100vh - 190px)' }}
      />
    </div>
  )
}


