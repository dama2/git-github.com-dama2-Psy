import React, { useState } from 'react';
import { Button, Divider, Radio, Table } from 'antd';
import { model } from '../../utils/table';
import './index.scss'


export default function ModelSelect() {
    const [hasBeganTrain, setHasBeganTrain] = useState(false);
    const [selectedKeys, setSelecteKeys] = useState([])
    const data = [
        {
            key: '1',
            name: '用户个体行为的超球体检测模型（BP）',
            info: '从用户交易行为中提取行为基准，包括交易金额、交易时间、交易频率、交易频率等。并使用超球体模型判断当前交易是否符合历史行为基准',
            AUC: '65.31%',
            'F1-Score': '40.67%',
            Recall: '59.54%',
            Precision: '34.97%'
        },
        {
            key: '2',
            name: '具有交易性格的用户行为识别模型（UBMRTC）',
            info: '从交互数据中提取谨慎度性格，包括购前同类对比度、同类商品取决度、历史浏览数量。并从交易数据中提取行为习惯，最终将两者结合共同用于欺诈检测',
            AUC: '67.99%',
            'F1-Score': '44.52%',
            Recall: '61.36%',
            Precision: '39.14%',
        },
        {
            key: '3',
            name: '大五交易心理行为证书模型',
            info: '基于心理学大五人格模型，从交易或交互数据中分析并定义交易人格行为，包括复购、价格多样性、无关商品吸引度等，最后构建行为证书',
            AUC: '80.64%',
            'F1-Score': '64.21%',
            Recall: '56.53%',
            Precision: '85.11%',
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys) => {
            setSelecteKeys(selectedRowKeys)
        }
    }
    const handleTrain = () => {
        setHasBeganTrain(true)

    }
    return (
        <div className='modelSelect'>
            <Table
                rowSelection={{
                    ...rowSelection,
                }}
                columns={model}
                dataSource={data}
                pagination={false}
            />
            <Button
                disabled={hasBeganTrain | selectedKeys.length == 0}
                className={(hasBeganTrain | selectedKeys.length == 0) ? "disable-btn" : "standard-main-btn"}

                onClick={handleTrain} >
                训练模型
            </Button>
        </div>
    )
}
