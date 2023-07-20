// 数据监控界面，交易展示
const transaction = [
    {
        title: '用户ID',
        // width: 100,
        dataIndex: 'u_id',
        key: 'u_id',
        fixed: 'left',
    },
    {
        title: '商品ID',
        // width: 100,
        dataIndex: 'sku_id',
        key: 'sku_id',
        fixed: 'left',

    },
    {
        title: '订单时间',
        // width: 100,
        dataIndex: 'date',
        key: 'date',
        fixed: 'left',
    },
    {
        title: '商品价格',
        // width: 100,
        dataIndex: 'price',
        key: 'price',
        fixed: 'left',
    },
    {
        title: '商品种类',
        // width: 100,
        dataIndex: 'cate',
        key: 'cate',
        fixed: 'left',
    },
    {
        title: '标记',
        // width: 100,
        dataIndex: 'label',
        key: 'label',
        fixed: 'left',
        color: 'red',
        style: {
            color: 'red'
        },
        render: (item) => <span>123</span>
    }
]

// 数据配置界面，数据介绍
const fraudTrans = [
    {
        title: '用户ID',
        // width: 100,
        dataIndex: 'u_id',
        key: 'u_id',
        fixed: 'left',
    },
    {
        title: '商品ID',
        // width: 100,
        dataIndex: 'sku_id',
        key: 'sku_id',
        fixed: 'left',

    },
    {
        title: '订单时间',
        // width: 100,
        dataIndex: 'date',
        key: 'date',
        fixed: 'left',
    },
    {
        title: '商品价格',
        // width: 100,
        dataIndex: 'price',
        key: 'price',
        fixed: 'left',
    },
];

// 数据配置界面，数据介绍
const dataShow = [
    {
        title: '文件ID',
        width: 100,
        dataIndex: 'id',
        key: 'id',
        fixed: 'left',
    },
    {
        title: '文件描述',
        width: 300,
        dataIndex: 'description',
        key: 'ddescriptione',
        fixed: 'left',
    },
];

export {
    dataShow,
    transaction,
    fraudTrans
}