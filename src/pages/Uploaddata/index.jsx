
import React from 'react'
import { Button, Steps, Result,Input } from 'antd';

import { SmileOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './index.scss'
import MyUpload from '../../components/MyUpload';
import MyDrawer from '../../components/Drawer';
import Mycard from '../../components/Mycard';

export default function Uploaddata() {
  const { TextArea } = Input;
  const steps = [
    {
      title: '上传数据',
    },
    {
      title: '检查报错信息',
      content: 'Second-content',
    },
    {
      title: '确认上传',
    },
  ];
  // 当前在第几步
  const [current, setCurrent] = useState(0);
  // 下一步
  const next = () => {
    setCurrent(current + 1);
  };
  // 上一步
  const prev = () => {
    setCurrent(current - 1);
  };
  // 步骤条的内容
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  // 第一步是否上传成功
  const [sucessUpload, setSucessUpload] = useState(true)
  // 是否上传成功
  const successUpload = () => {
    setSucessUpload(true)
  }
  const [isError, setError] = useState(true)

  // 返回的错误信息
  const error = [
    {
      name: 'sku_basic',
      // key:代表某一列   value: 一个数组，[数据类型是否有错误, 是否数据类型有错误] 
      error: {
        // 是否存在
        isExist: true,
        // 缺少的属性
        colums: ['cate', 'price'],
        // 存在nan的属性
        columsNan: ['price'],
        // 数据类型有错误的属性
        dataType: ['price']
      }
    },
    {
      name: 'action_data',
      // key:代表某一列   value: 一个数组，[数据类型是否有错误, 是否数据类型有错误] 
      error: {
        // 是否存在
        isExist: false,
        // 缺少的属性
        colums: ['cate'],
        // 存在nan的属性
        columsNan: ['price'],
        // 数据类型有错误的属性
        dataType: ['price']
      }
    },
    {
      name: 'order_data',
      // key:代表某一列   value: 一个数组，[数据类型是否有错误, 是否数据类型有错误] 
      error: {
        // 是否存在
        isExist: false,
        // 缺少的属性
        colums: ['cate'],
        // 存在nan的属性
        columsNan: ['price'],
        // 数据类型有错误的属性
        dataType: ['price']
      }
    },
    {
      name: 'comment_data',
      // key:代表某一列   value: 一个数组，[数据类型是否有错误, 是否数据类型有错误] 
      error: {
        // 是否存在
        isExist: false,
        // 缺少的属性
        colums: ['cate'],
        // 存在nan的属性
        columsNan: ['price'],
        // 数据类型有错误的属性
        dataType: ['price']
      }
    },
  ]
  // 确认提交按钮是否可以点击
  const [hasSubmit, setHasSubmit] = useState(false)

  return (
    <div className='upload'>
      {/* 步骤条 */}
      <div className='steps'>
        <Steps current={current} items={items} />
      </div>
      {/* 内容区 */}
      <div className='uploadContent' style={{ display: current === 0 ? '' : 'none' }}>
        <MyDrawer />
        <MyUpload />
      </div>
      <div className='errorContent' style={{ display: current === 1 ? '' : 'none' }}>
        {error.map(item => <Mycard item={item} key={item.name} />)}
      </div>
      <div className='submitContent' style={{ display: current === 2 ? '' : 'none' }}>
        <Result
          icon={<SmileOutlined />}
          title="您上传的数据符合要求，现在可以上传了！"

        />
        <TextArea
          className='textArea'
          showCount
          maxLength={100}
          style={{
            height:200,
            resize:'none',
          }}
          // onChange={onChange}
          placeholder="请输入对数据的描述！一般包括时间跨域，交易数量，用户数量...."
        />
      </div>
      {/* 按钮 */}
      <div className='button'>
        {current === 0 && (
          <Button disabled={!sucessUpload} className={sucessUpload ? "standard-main-btn" : "disable-btn"} onClick={() => next()}>
            下一步
          </Button>
        )}
        {current === 1 && (
          <Button disabled={!isError} className={isError ? "standard-main-btn" : "disable-btn"} onClick={() => next()}>
            下一步
          </Button>
        )}
        {current === 2 && (
          <Button disabled={hasSubmit} className={hasSubmit ? "disable-btn" : "standard-main-btn"} onClick={() => setHasSubmit(true)}>
            确认提交
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            上一步
          </Button>
        )}
      </div>
    </div>
  )
}
