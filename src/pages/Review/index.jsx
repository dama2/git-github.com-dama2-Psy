import React, { useEffect, useState, useRef } from 'react'
import { Button, Table, Select, message, Tabs } from 'antd'
import { fraudTrans } from '../../utils/table'
import './index.scss'
import MyDescription from '../../components/MyDescription';
import { changeStatus, getFruadTrans } from '../../api/trans';
import MyRadar from '../../components/MyRadar';

export default function Review() {
    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });
    const [searchedColumn, setSearchedColumn] = useState('');
    // 表格中展示的数据
    const [data, setData] = useState([
        {
            u_id: 200,
            sku_id: 200,
            date: '2002/01/01',
            price: 10,
            status: 0
        }


    ])
    // 是否正在加载
    const [loading, setLoading] = useState(false);
    // 页面的配置，包括当前在第几页，每页多少条数据
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            defaultPageSize: 12
        },
    });
    // 展示的数据
    const showColumns = [
        ...fraudTrans,
        {
            title: '状态',
            dataIndex: "status",
            key: 'status',
            fixed: 'left',
            render: (item) => {
                return item === -1 ? "未审核" : item === 0 ? '放行' : '拦截'
            }
        },

        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (item) => <Button className='standard-main-btn' onClick={() => handleSelectd(item)}>审核</Button>
        }
    ]
    // 点击查看该交易的详细信息
    const handleSelectd = (e) => {
        // 首先找到订单的信息
        setOrderInfo(e)
        setStatus(e.status)
    }
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
        getFruadTrans({ current: tableParams.pagination.current, key: '1' }).then(value => {
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

    // 保存正在审核的人员
    const [orderInfo, setOrderInfo] = useState({})
    // 保存交易的状态
    const [status, setStatus] = useState(-1)

    // 切换交易的状态
    const handleChange = (value) => {
        setStatus(value)

    }
    // 确认提交
    const handleSumbit = () => {
        changeStatus({ key: '1', sku_id: orderInfo.sku_id, status, o_id: orderInfo.o_id }).then(value => { message.success('审核成功') })
    }

    // tabs栏中展示的详细信息
    const items = [
        {
            key: '1',
            label: `订单详情`,
            children: <div>
                <MyDescription info={orderInfo} />
                <span className='result'>本次审核意见：</span><Select
                    placeholder='请选择'
                    style={{
                        width: 150,
                        fontSize: 20
                    }}
                    onChange={handleChange}
                    options={[
                        {
                            value: '1',
                            label: '拦截',
                        },
                        {
                            value: '0',
                            label: '放行',
                        },
                    ]}
                />

                <Button className='standard-main-btn submit' onClick={handleSumbit}>确定</Button>
            </div>
        },
        {
            key: '2',
            label: `心理模型性情`,
            children: <div> <MyRadar info='123'/> </div>,
        },
    ];

    const onChange = () => { }

    return (
        <div className='reviewContent'>
            <div className='fraud'>
                <Table
                    columns={showColumns}
                    // rowKey={(record) => record.login.uuid}
                    dataSource={data}
                    pagination={{ ...tableParams.pagination, showSizeChanger: false }}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </div>
            <div className='analyze'>
                



            </div>


        </div>
    )
}

