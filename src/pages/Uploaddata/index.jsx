
import React from 'react'
import { Button, Steps, Result, Input, message } from 'antd';

import { SmileOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './index.scss'
import MyUpload from '../../components/MyUpload';
import Mycard from '../../components/Mycard';
import { getUploadError, saveDate } from '../../api/data';

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
  // 判断表格内容是否有误
  const [hasError, sethasError] = useState(true)

  // 保存文件的key值
  const [filekey, setFileKey] = useState(null)

  // 确认提交按钮是否可以点击
  const [hasSubmit, setHasSubmit] = useState(false)
  // 用户输入的对数据的描述
  const [description, setDescription] = useState('')
  //  错误信息
  const [error, setError] = useState([])
  // 上传成功
  const handleSuccessUpload = (key) => {
    if (key) setFileKey(key)
    else setFileKey(null)
  }
  // 到第二步
  const toSecondStep = () => {
    // 获取错误信息
    getUploadError({ key: filekey }).then(value => {
      setError(value)
      next()
      // 检查返回的数据，改变setError
      for (let ele of value) {
        for (let index in ele.error) {
          if (index == 'isExist' && ele.error[index] == false) return
          else if (index == 'isEmpty' && ele.error[index] == true) return
          else if (ele.error[index].length > 0) return

        }
        sethasError(false)
      }
    })

  }
  // 保存数据到数据库
  const handleSaveData = () => {
    saveDate({ key: filekey, description: description }).then(value => {
      message.success('成功保存到数据库')
      setHasSubmit(true)
    })
  }



  return (
    <div className='upload'>
      {/* 步骤条 */}
      <div className='steps'>
        <Steps current={current} items={items} />
      </div>
      {/* 内容区 */}
      <div className='uploadContent' style={{ display: current === 0 ? '' : 'none' }}>
        <MyUpload handleSuccessUpload={handleSuccessUpload} />
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
            height: 200,
            resize: 'none',
          }}
          onChange={(e) => { setDescription(e.currentTarget.value) }}
          placeholder="请输入对数据的描述！一般包括时间跨域，交易数量，用户数量...."
        />
      </div>
      {/* 按钮 */}
      <div className='button'>
        {current === 0 && (
          <Button disabled={!filekey} className={filekey ? "standard-main-btn" : "disable-btn"} onClick={() => toSecondStep()}>
            下一步
          </Button>
        )}
        {current === 1 && (
          <Button disabled={hasError} className={!hasError ? "standard-main-btn" : "disable-btn"} onClick={() => next()}>
            下一步
          </Button>
        )}
        {current === 2 && (
          <Button disabled={hasSubmit | description == ''} className={hasSubmit ? "disable-btn" : "standard-main-btn"} onClick={() => handleSaveData()}>
            确认提交
          </Button>
        )}
        {current > 0 && (
          <Button
            disabled={hasSubmit}
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
