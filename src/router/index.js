
import React from 'react'
import { BrowserRouter, HashRouter, Navigate, Route } from 'react-router-dom'
import Upload from '../pages/Uploaddata'
import Psy from '../pages/Monitor'
import Home from '../pages/Home'
import DataConfig from '../pages/DataConfig'
import Review from '../pages/Review'

export default ([
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/tmonitor',
        element: <Psy />
    },
    {
        path: '/treview',
        element: <Review />
    },
    {
        path: '/model',
        children: [
            {
                path: '',
                element: <Navigate to="upload"></Navigate>
            }, 
            {

                path: 'upload',
                element: <Upload />
            },
            
        ],
    },
    {
        path:'/dataDetail',
        element:<DataConfig/>
    },
    {
        path: '/',
        element: <Navigate to="/dataDetail"></Navigate>
    }
]

)
