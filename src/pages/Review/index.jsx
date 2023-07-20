import React, { useEffect, useState, useRef } from 'react'
import { Button, Table, Input, Space, } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import qs from 'qs'
import Highlighter from 'react-highlight-words';
import { fraudTrans } from '../../utils/table'
import './index.scss'

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
                return item === 0 ? "未审核" : "已审核"
            }
        },

        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (item) => <Button className='standard-main-btn' onClick={() => handleSelectd(item.id)}>审核</Button>
        }
    ]
    // 点击查看之后返回异常信息
    const handleSelectd = () => { }
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
        fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
            .then((res) => res.json())
            .then(({ results }) => {
                setData(results);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 200,
                    },
                });
            });
    };

    // 页面的配置发生
    useEffect(() => {
        // fetchData();
    }, [JSON.stringify(tableParams),]);


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

