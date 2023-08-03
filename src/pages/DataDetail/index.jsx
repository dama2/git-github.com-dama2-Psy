import React, { useEffect, useState } from 'react'
import { LeftOutlined } from '@ant-design/icons';
import './index.scss'
import { action, sku, order, comment } from '../../utils/table';
import CommentPie from '../../charts/CommentPie';
import { getActionPie, getCommentPie, getOrderPie, getOrderPie1 } from '../../api/charts';
import * as echarts from 'echarts';
import { Statistic, Table, message, Row, Col, Card } from 'antd';
import { dataRecord, getDateSize } from '../../api/data';
import { commentMap, orderNumMap, actionMap } from '../../utils/map';


export default function DataDetail(props) {
    const { fileID, closeDetail } = props
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
    let commentpieChart, orderpieChart, orderpieChart1, actionPieChart

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
        getActionPie({ key: fileID }).then(value => {
            value.map(item => {
                item.name = actionMap[item.name]
            })
            setactionPieData(value)
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

            actionPieChart = echarts.getInstanceByDom(
                document.querySelector('#actionpie')
            );
            if (actionPieChart == null) {
                actionPieChart = echarts.init(document.querySelector('#actionpie'));
            }
            pieOption(actionPieData, '浏览量分布') && actionPieChart.setOption(pieOption(actionPieData, '浏览量分布'))

        }, 2000)
    }, [isShowingTable])
    // 切换表格
    const handleCardChange = (tableName) => {
        setIsShowingTable(tableName)
        // 获取表格数据
        getTableData({ key: fileID, tableName: tableName })

    }
    // pie 表格的 Echart
    const pieOption = (data, title) => {
        return {
            title: {
                text: title,
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {d}%"
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
            <LeftOutlined className='back' onClick={closeDetail} />
            {/* 表格统计信息 */}
            <div className='header'>
                {
                    Object.keys(datSize).map(key => {
                        return <div key={key} className={isShowingTable == key ? 'card active' : ' card'}>
                            < Card title={key} onClick={(e, key1 = key) => handleCardChange(key1)}>
                                <Statistic title="数量" value={datSize[key]} />
                            </Card>
                        </div>
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
                {/* <div className='rightChart' style={{ opacity: isShowingTable == 'action' ? 1 : 0 }}>
                    <div id='commentpie' ></div>
                </div> */}

                <div className='rightChart' >

                    <div id='actionpie' style={{ opacity: isShowingTable == 'action' ? 1 : 0, zIndex: isShowingTable == 'action' ? 100 : 0 }}></div>

                    <div id='commentpie'
                        style={{ opacity: isShowingTable == 'comment' ? 1 : 0, zIndex: isShowingTable == 'comment' ? 100 : 0 }}>
                    </div>


                    <div id='orderpie' style={{ opacity: isShowingTable == 'order' ? 1 : 0, zIndex: isShowingTable == 'order' ? 100 : 0 }}></div>
                    <div id='orderpie1' style={{ opacity: isShowingTable == 'order' ? 1 : 0 ,zIndex: isShowingTable == 'order' ? 100 : 0}}></div>

                </div>

            </div>

        </div >
    )
}
