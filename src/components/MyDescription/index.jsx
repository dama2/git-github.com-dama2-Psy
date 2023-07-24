import React from 'react';
import { Descriptions } from 'antd';
import './index.scss'
import { color } from 'echarts';

export default function MyDescription(props) {
    const { info: { k1, k2, k3, k4, J1, J2, J3, J5, J6, J7, S1, S3, Y2, Y3 } } = props
    return (
        <Descriptions className='mydescription' column={2} contentStyle={
            {
                fontSize: 16,
                color: '#1677ff',
                fontWeight: 'bold'
            }
        }
            labelStyle={{
                fontSize: 16,
                color: 'black',
                fontWeight: 'bold'
            }}>
            <Descriptions.Item label="是否为复购行为/复购概率">{k2 === 0 ? '否' : '是'}/0.8</Descriptions.Item>
            <Descriptions.Item label="其他吸引度/正常其他商品吸引度">{k1}/0.3</Descriptions.Item>
            <Descriptions.Item label="价格/正常价格">{k3}/140</Descriptions.Item>
            <Descriptions.Item label="商品销售量/正常销售量">{k4}/0.3</Descriptions.Item>
            <Descriptions.Item label="对比商品价格比/正常对比价格">{J1}/1.2</Descriptions.Item>
            <Descriptions.Item label="选购时间/正常选购时间">{J3}/6</Descriptions.Item>
            <Descriptions.Item label="对比商品数量/历史对比数量">{J5}/30</Descriptions.Item>
            <Descriptions.Item label="今天该种类商品销售量/正常销售量">{J6}/8000</Descriptions.Item>
            <Descriptions.Item label="商品点击次数/正常点击次数">{J7}/3.4</Descriptions.Item>
            <Descriptions.Item label="是否为常用地址/常用地址概率">{Y2}/0.7</Descriptions.Item>
            <Descriptions.Item label="购买数量/正常购买数量">{S1}/1.1</Descriptions.Item>
            <Descriptions.Item label="购物频率/正常购物频率">{S3}/15</Descriptions.Item>
        </Descriptions>
    )
}

