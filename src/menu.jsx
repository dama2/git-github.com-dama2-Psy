import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
    {
        label: '首页',
        path: '/home',
      },
      {
        label: '上传数据',
        path: '/upload',
      },
      {
        label: '交易监控',
        path: '/tmonitor',
      },
      {
        label: '交易审核',
        path: '/treview',
      },
      {
        label: '数据配置',
        path: '/dataConfig',
        chileren:[
          {
            label: '上传数据',
            path: 'upload',
          },
          {
            label: '数据配置',
            path: 'dataDetail',
          },
        ]
      },
];
const App = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.path);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default App;