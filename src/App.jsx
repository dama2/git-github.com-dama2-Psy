
import './App.scss';
import { NavLink, useNavigate, useRoutes } from 'react-router-dom';
import router from './router';
import { useEffect, useState } from 'react';
import { Menu } from 'antd';
import menus from './utils/menu'

function App() {
  const route = useRoutes(router)
  const navigate=useNavigate()
  // 记录当前在那个页面
  const [current, setCurrent] = useState('/home');
  const onClick = (e) => {
    // 页面跳转
    navigate(e.key)
    // 当前页面可选择
    setCurrent(e.key);
  };
  // 刚进入页面跳转到登录界面
  useEffect(()=>{
    navigate(current)
  },[])
  return (
    <div className='root'>
      <div className='navbar'>
        <div className='title'>心理行为反欺诈系统</div>
        <div className='menu'>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menus} />;
        </div>
      </div>
      <div className='content'>
        {/* 注册路由 */}
        {route}
      </div>
    </div>
  );
}

export default App;




