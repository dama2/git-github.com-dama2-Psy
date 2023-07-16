
import './App.scss';
import { NavLink, useRoutes } from 'react-router-dom';
import router from './router';
import { useState } from 'react';

function App() {
  const route = useRoutes(router)
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
    },
    

  ];
  // const [current, setCurrent] = useState('upload');
  return (
    <div className='root'>
      <div className='navbar'>
        <div className='title'>心理行为反欺诈系统</div>
        <div className='menu'>
          {items.map((item, index) => <span key={index}>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to={item.path}>
              {item.label}
            </NavLink>
          </span>)
           }
        </div>
      </div>
      <div className='line'></div>
      <div className='content'>
        {/* 注册路由 */}
        {route}
      </div>

    </div>
  );
}

export default App;




