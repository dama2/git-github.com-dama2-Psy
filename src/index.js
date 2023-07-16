/*
 * @Author: dama2 linama2@163.com
 * @Date: 2023-07-09 15:30:10
 * @LastEditors: dama2 linama2@163.com
 * @LastEditTime: 2023-07-09 22:56:57
 * @FilePath: /psy/src/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { message } from 'antd';

// 提示框的配置
message.config({
  top: 10,
  duration: 2,
  maxCount: 3,
  rtl: true,
  prefixCls: 'my-message',
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>

);

