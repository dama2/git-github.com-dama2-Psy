import React, { useEffect, useState, useRef } from 'react'
import { Button, Table, Popconfirm, message, Modal } from 'antd'
import { fraudTrans } from '../../utils/table'
import './index.scss'
import MyDescription from '../../components/MyDescription';
import { changeStatus, getFruadTrans } from '../../api/trans';
import MyRadar from '../../components/MyRadar';

export default function Review() {

    const indicators = [
        // 开放性
        [{ name: '无关商品吸引度' },
        { name: '复购率' },
        { name: '价格多样性' },
        { name: '商品受众度' },],
        // 尽责性
        [{ name: '商品价格对比度' },
        { name: '评论度' },
        { name: '选购时间' },
        { name: '无关商品吸引度' },
        { name: '对比商品数量' },
        { name: '活动期间购买' },
        { name: '购前点击次数' },],
        // 外向性
        [{ name: '商品受众度' },
        { name: '购前点击次数' },
        { name: '价格多样性' },
        { name: '选购时间' },],
        // 宜人性
        [{ name: '商品受众度' },
        { name: '友好度' },
        { name: '差评率' },],
        //神经质
        [{ name: '购买数量' },
        { name: '差评率' },
        { name: '购物频率' },],
    ]
    // 表格中展示的数据
    const [data, setData] = useState([])
    // 是否正在加载
    const [loading, setLoading] = useState(false);
    // 页面的配置，包括当前在第几页，每页多少条数据
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            defaultPageSize: 12
        },
    });
    // 保存正在审核的人员
    const [orderInfo, setOrderInfo] = useState({})
    // 保存住反应心理的行为
    const [psyData, setpsyData] = useState([])
    // 在审核交易时保存现在在几步
    const [current, setCurrent] = useState(0)
    // 像radar传递的的是数据
    const [radarData, setradarData] = useState({})
    // 下一步
    const nextStep = () => {
        // 当前第几步
        setradarData(radarData =>
        ({
            indicator: indicators[current + 1],
            data1: psyData[current + 1],
            data2: psyData[current + 1]
        }))
        setCurrent(current + 1)

    }
    const preStep = () => {
        setradarData(radarData =>
        ({
            indicator: indicators[current - 1],
            data1: psyData[current - 1],
            data2: psyData[current - 1]
        }))
        setCurrent(current - 1)
    }

    // 点击查看该交易的详细信息
    const handleSelectd = (info) => {
        // 将详细信息保存起来
        setOrderInfo(info)
        // 保存心理维度
        setpsyData([
            [info.k1, info.k2, info.k3, info.k4],
            [info.J1, info.J2, info.J3, info.k1, info.J5, info.J6, info.J7],
            [info.W1, info.W2, info.W3, info.W4],
            [info.Y1, info.Y2, info.Y3],
            [info.S1, info.S2, info.S3]
        ])
        setradarData(radarData => ({
            indicator: indicators[0],
            data1: [info.k1, info.k2, info.k3, info.k4],
            data2: [info.k1, info.k2, info.k3, info.k4]
        }))
    }
    // 确认提交
    const handleSumbit = ( newStatus,info) => {
        if (info) {
            changeStatus(
                { key: '02f6ba20_1ffc_4840_8ee5_ca95b2c75ca4', sku_id: info.sku_id, status: newStatus, o_id: info.o_id }).
                then(value => { message.success('审核成功'); fetchData() })

        }
        else {
            changeStatus(
                { key: '02f6ba20_1ffc_4840_8ee5_ca95b2c75ca4', sku_id: orderInfo.sku_id, status: newStatus, o_id: orderInfo.o_id })
                .then(value => { message.success('审核成功'); fetchData() })
        }
        setOrderInfo({})
        setCurrent(0)
    }
    // 展示的数据
    const showColumns = fraudTrans(handleSelectd, handleSumbit)
    // 表格内容改变
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };
    // 向后端发送请求，请求数据
    const fetchData = () => {
        setLoading(true);
        getFruadTrans({ current: tableParams.pagination.current, key: '02f6ba20_1ffc_4840_8ee5_ca95b2c75ca4' }).then(value => {
            setData(value.data)
            setLoading(false);
            setTableParams({
                ...tableParams.pagination,
                pagination: {
                    total: value.total,
                    current: value.current,
                }
            })
        })
    };
    // 页面的配置发生
    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams),]);


    const onCancel = () => {
        setCurrent(0)
        setOrderInfo({})
    }

    return (
        <div className='reviewContent'>
            <div className='fraud' >
                <Table
                    columns={showColumns}
                    // rowKey={(record) => record.login.uuid}
                    dataSource={data}
                    pagination={{ ...tableParams.pagination, showSizeChanger: false }}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </div>

            <Modal
                title="审核交易"
                centered
                open={Object.keys(orderInfo).length > 0 ? true : false}
                // onOk={() => setOpen(false)}
                onCancel={onCancel}
                width={800}
                okText='提交'
                cancelText='取消'
            >
                <div id='reviewChart'>
                    <MyRadar radarData={radarData} />
                </div>
                <div className='reviewbutton'>
                    {current > 0 ? <Button onClick={preStep}> 上一步</Button> : ''}
                    {current < 5 ? <Button onClick={nextStep} type='primary'> 下一步</Button> : ''}
                    <Button onClick={()=>handleSumbit(0)} type='primary'> 拦截</Button>
                    <Popconfirm
                        title="警告"
                        description="确定放行吗？"
                        onConfirm={() => handleSumbit(1)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button danger>放行</Button>
                    </Popconfirm>
                </div>
            </Modal>



        </div>
    )
}

