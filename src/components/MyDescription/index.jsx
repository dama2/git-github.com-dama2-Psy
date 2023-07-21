import React from 'react';
import { Descriptions } from 'antd';
import './index.scss'
import { color } from 'echarts';

export default function MyDescription(props) {
    const {name,}=props
    return (
        <Descriptions className='mydescription' column={2} contentStyle={
            {
                fontSize:16,
                color:'#1677ff',
                fontWeight:'bold'
            }

        }
        labelStyle={{
            fontSize:16,
            color:'black',
            fontWeight:'bold'
        }}>
            <Descriptions.Item label="是否为复购行为">是（历史复购概率为0.8）</Descriptions.Item>
            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
        </Descriptions>
    )
}

