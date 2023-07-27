import { Card, Tag } from 'antd';
import React from 'react';

import './index.scss'

export default function Mycard(props) {
    const { item: { name, error } } = props
    return (
        <Card className='mycard'
            title={name}
            bordered={false}
        >
            <p>是否上传：<Tag color={error.isExist ? "success" :"error"}> {error.isExist ? '是' : "否"} </Tag></p>
            <p>是否为空：<Tag color={!error.isEmpty ? "success" :"error"}> {!error.isExist ? '是' : "否"} </Tag></p>
            <p>缺失属性：{error.columns.map(ele=><Tag color="default"> {ele} </Tag>)}</p>
            <p>存在NaN：{error.columnsNan.map(ele=><Tag color="default"> {ele} </Tag>)}</p>
            <p>数据类型错误：{error.dataType.map(ele=><Tag color="default"> {ele} </Tag>)}</p>
        </Card>
    )

}