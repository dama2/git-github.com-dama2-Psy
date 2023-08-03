const data1 = [0, 0, 0, 0, 0, 0, 0,]
const data2 = [0, 0, 0, 0, 0, 0, 0,]
const categories = [0, 0, 0, 0, 0, 0, 0,]
const categories2 = [0, 0, 0, 0, 0, 0, 0]
const payTypeData = [0, 0, 0, 0, 0];
const cateNameData = [0, 0, 0, 0, 0, 0]
const color = ['#4096ff', '#36cfc9', '#73d13d', '#ffa940', '#ff7a45',
    '#597ef7', '#9254de', '#f759ab', '#8c8c8c', '#c41d7f',
    '#d3adf7', '#ffc53d', '#ff4d4f', '#cf1322', '#d46b08',
    '#FF1493', '#FFC0CB', '#8B5742', '#8B8682', '#8B636C',
    '#F0FFF0', '#90EE90', '#7A8B8B', '#8B0000', '#00CD66',
    '#1E90FF', '#4169E1', '#7CCD7C', '#5b8c00', '#096dd9', '#614700'
]
const areaNameData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
export const transOption = {
    title: {
        text: '实时拦截放行'
    },
    grid: {
        bottom: '12%'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#283b56'
            }
        }
    },
    legend: {},
    toolbox: {
        show: true,
        feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
        }
    },
    dataZoom: {
        show: false,
        start: 0,
        end: 100
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: categories
        },
        {
            type: 'category',
            boundaryGap: true,
            data: categories2
        }
    ],
    yAxis: [
        {
            type: 'value',
            scale: true,
            name: '交易量',
            max: 1000,
            min: 0,
            boundaryGap: [0.2, 0.2]
        },
    ],
    series: [
        {
            name: '正常交易',
            type: 'bar',
            data: data1
        },
        {
            name: '异常交易',
            type: 'line',
            data: data2
        }
    ]
};

export const payTypeOption = {
    title: {
        text: '异常交易交易方式分布'
    },
    grid: {
        bottom: '12%',
        right: '6%',
        top:'15%'
    },
    xAxis: {
        // max: 'dataMax',
        show:false
    },
    yAxis: {
        type: 'category',
        data: ['微信', '银行卡', '白条', '好友代付', '云闪付'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
    },
    series: [
        {
            realtimeSort: true,
            name: 'X',
            type: 'bar',
            data: payTypeData,
            label: {
                show: true,
                position: 'right',
                valueAnimation: true
            },
            itemStyle: {
                color: function (e) {
                    return color[e.dataIndex]
                }
            }
        }
    ],
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
};

export const areaNameOption = {
    title: {
        text: '异常交易地区分布'
    },
    grid: {
        bottom: '8%',
        right: '6%',
        top:'8%'
    },
    xAxis: {
        // max: 'dataMax'
        show:false
    },
    yAxis: {
        type: 'category',
        data: ['河北', '山西', '吉林', '辽宁', '黑龙江', '陕西', '甘肃', '青海', '山东', '福建', '浙江', '河南', '湖北', '湖南', '江西', '江苏', '安徽', '广东', '海南', '四川', '贵州', '云南', '北京', '上海', '天津', '重庆', '内蒙古', '新疆', '宁夏', '广西', '西藏'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 20,

    },
    series: [
        {
            realtimeSort: true,
            name: 'X',
            type: 'bar',
            data: areaNameData,
            label: {
                show: true,
                position: 'right',
                valueAnimation: true
            },
            itemStyle: {
                color: function (e) {
                    return color[e.dataIndex]
                }
            }
        }
    ],
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
};

export const cateNameOption = {
    title: {
        text: '异常交易商品种类分布'
    },
    grid: {
        bottom: '10%',
        right: '6%',
        top:'15%'
    },
    xAxis: {
        // max: 'dataMax'
        show:false
    },
    yAxis: {
        type: 'category',
        data: ['数码家电', '生活用品', '虚拟物品', '服装鞋帽', '家居用品', '办公用品'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,

    },
    series: [
        {
            realtimeSort: true,
            name: 'X',
            type: 'bar',
            data: cateNameData,
            label: {
                show: true,
                position: 'right',
                valueAnimation: true
            },
            itemStyle: {
                color: function (e) {
                    return color[e.dataIndex]
                }
            }
        }
    ],
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
};

export const moneyOption = {
    title: {
        text: '实时正常-异常平均交易金额'
    },
    grid: {
        bottom: '8%',
        top:'20%'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#283b56'
            }
        }
    },
    legend: {
        top:30
    },
    toolbox: {
        show: true,
        feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
        }
    },
    dataZoom: {
        show: false,
        start: 0,
        end: 100
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: categories
        },
        {
            type: 'category',
            boundaryGap: true,
            data: categories2
        }
    ],
    yAxis: [
        {
            type: 'value',
            scale: true,
            name: '交易价格',
            max: 1500,
            min: 0,
            boundaryGap: [0.2, 0.2]
        },
    ],
    series: [
        {
            name: '正常交易',
            type: 'bar',
            data: data1
        },
        {
            name: '异常交易',
            type: 'line',
            data: data2
        }
    ]
};