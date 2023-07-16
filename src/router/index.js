/*
 * @Author: dama2 linama2@163.com
 * @Date: 2023-07-09 21:39:35
 * @LastEditors: dama2 linama2@163.com
 * @LastEditTime: 2023-07-09 22:55:47
 * @FilePath: /psy/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { BrowserRouter, HashRouter, Navigate, Route } from 'react-router-dom'
import Upload from '../pages/Uploaddata'
import Psy from '../pages/Monitor'
import Home from '../pages/Home'
import DataConfig from '../pages/DataConfig'

export default ([
    {
        path:'/home',
        element:<Home/>
    },
    {
        path:'/upload',
        element:<Upload/>

    },
    {
        path:'/tmonitor',
        element:<Psy/>
    },
    {
        path:'/treview',
        element:<Psy/>
    },
    {
        path:'/dataConfig',
        element:<DataConfig/>
    },
    {
        path:'/',
        element:<Navigate to="/home"></Navigate>
    }
]
    
)
