import React, { useEffect, useState } from 'react'
import { LeftOutlined } from '@ant-design/icons';
import './index.scss'
import { action, sku, order, comment } from '../../utils/table';
import CommentPie from '../../charts/CommentPie';
import { getCommentPie, getOrderPie, getOrderPie1 } from '../../api/charts';
import * as echarts from 'echarts';
import OrderPie from '../../charts/OrderPie/index.jsx';
import OrderPie1 from '../../charts/OrderPie1';
import { Statistic, Table, message, Row, Col, Card } from 'antd';
import { dataRecord, getDateSize } from '../../api/data';
import { commentMap, orderNumMap } from '../../utils/map';


export default function DataDetail(props) {
    const { fileID } = props
    const [isShowingTable, setIsShowingTable] = useState('action')
    // 详情里表格的名字
    const [dataTable, setDataTable] = useState([])
    // 饼图中的数据
    const [commentPieData, setcommentPieData] = useState([])
    const [actionPieData, setactionPieData] = useState([])
    const [skuPieData, setskuPieData] = useState([])
    const [orderPieData, setorderPieData] = useState([])
    const [orderPieData1, setorderPieData1] = useState([])
    const [datSize, setDataSize] = useState({ action: '', comment: '', sku: '', order: '' })
    let commentpieDom, commentpieChart = null
    let orderpieDom, orderpieChart = null
    let orderpieDom1, orderpieChart1 = null


    useEffect(() => {
        getDateSize({ key: fileID }).then(value => {
            setDataSize(value)
        })
        getTableData({ key: fileID, tableName: isShowingTable })
        // 同时所有图表数据
        getCommentPie({ key: fileID }).then(value => {
            value.map(item => {
                item.name = commentMap[item.name]
            })
            setcommentPieData(value)
        })
        getOrderPie({ key: fileID }).then(value => {
            setorderPieData(value)
        })
        getOrderPie1({ key: fileID }).then(value => {
            value = value.sort((a, b) => a.name >= b.name)
            value.map(item => {
                item.name = orderNumMap[item.name]
            })
            setorderPieData1(value)
        })
        window.addEventListener("resize", () => {
            commentpieChart.resize();
            orderpieChart.resize()
            orderpieChart1.resize()
        })

    }, [])

    useEffect(() => {
        setTimeout(() => {
            commentpieChart = echarts.getInstanceByDom(
                document.querySelector('#commentpie')
            );
            if (commentpieChart == null) {
                commentpieChart = echarts.init(document.querySelector('#commentpie'));
            }
            pieOption(commentPieData, '评论分布') && commentpieChart.setOption(pieOption(commentPieData, '评论分布'))
            // commentpieChart.resize()

            orderpieChart = echarts.getInstanceByDom(
                document.querySelector('#orderpie')
            );
            if (orderpieChart == null) {
                orderpieChart = echarts.init(document.querySelector('#orderpie'));
            }
            pieOption(orderPieData, '付款方式分布') && orderpieChart.setOption(pieOption(orderPieData, '付款方式分布'))


            orderpieChart1 = echarts.getInstanceByDom(
                document.querySelector('#orderpie1')
            );
            if (orderpieChart1 == null) {
                orderpieChart1 = echarts.init(document.querySelector('#orderpie1'));
            }
            pieOption(orderPieData1, '交易数量分布') && orderpieChart1.setOption(pieOption(orderPieData1, '交易数量分布'))

        }, 2000)
    }, [])
    // 切换表格
    const handleCardChange = (tableName) => {
        setIsShowingTable(tableName)
        // 获取表格数据
        getTableData({ key: fileID, tableName: tableName })
        // if (tableName == 'comment') commentpieChart.resize()

    }
    // pie 表格的 Echart
    const pieOption = (data, title) => {
        return {
            title: {
                text: title,
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    type: 'pie',
                    radius: '70%',
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
    }
    const getTableData = (parmas) => {
        dataRecord(parmas).then(value => setDataTable(value))
    }

    return (
        <div className='dataconfigDetail'>
            <LeftOutlined className='back' />
            {/* 表格统计信息 */}
            <div className='header'>
                {
                    Object.keys(datSize).map(key => {
                        return < Card title={key} className={isShowingTable == key ? 'card active' : ' card'} onClick={(e, key1 = key) => handleCardChange(key1)}>
                            <Statistic title="数量" value={datSize[key]} />
                        </Card>
                    })
                }
            </div>
            <div className='dataAnalysis'>
                {/* 左边是表格 */}
                <Table
                    className='table'
                    columns={isShowingTable === 'action' ? action : isShowingTable === 'sku' ? sku : isShowingTable === 'comment' ? comment : order}
                    dataSource={dataTable}
                    pagination={false}
                // loading={loading}

                ></Table>
                {/* 右边是分析 */}

                <div className='rightChart' style={{ display: isShowingTable == 'comment' ? 'flex' : 'none' }}>
                    <div id='commentpie' style={{ height: '70%', width: '70%', position: 'relative' }}></div>
                </div>

                <div className='rightChart' style={{ display: isShowingTable == 'order' ? 'flex' : 'none' }}>

                    <div className='inner'>
                        <div id='orderpie' style={{ height: '100%', width: '100%', position: 'relative' }}></div>
                    </div>
                    <div className='inner'>
                        <div id='orderpie1' style={{ height: '100%', width: '100%', position: 'relative' }}></div>
                    </div>
                    {/* <div className='inner'>
                        <div id='orderpie1'></div>
                    </div> */}
                </div>
            </div>

        </div >
    )
}
