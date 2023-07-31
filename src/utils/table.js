// 数据监控界面，交易展示
import { Button, message, Popconfirm } from "antd";

const transaction = [
    {
        title: '用户ID',
        width: 80,
        dataIndex: 'user_id',
        key: 'user_id',
        fixed: 'left',
    },
    {
        title: '用户姓名',
        width: 90,
        dataIndex: 'userName',
        key: 'userName',
        fixed: 'left',
    },
    {
        title: '商品ID',
        width: 90,
        dataIndex: 'sku_id',
        key: 'sku_id',
        fixed: 'left',

    },
    {
        title: '商品种类',
        width: 100,
        dataIndex: 'cateName',
        key: 'cateName',
        fixed: 'left',
    },
    {
        title: '交易时间',
        // width: 130,
        dataIndex: 'date',
        key: 'date',
        fixed: 'left',
    },
    {
        title: '交易金额',
        width: 90,
        dataIndex: 'price',
        key: 'price',
        fixed: 'left',
    },
    {
        title: '订单地址',
        width: 90,
        dataIndex: 'areaNum',
        key: 'areaNum',
        fixed: 'left',
    },
    {
        title: '交易方式',
        width: 90,
        dataIndex: 'payType',
        key: 'payType',
        fixed: 'left',
    },


    {
        title: '标记',
        width: 80,
        dataIndex: 'label',
        key: 'label',
        fixed: 'left',
    }
]

// 数据配置界面，数据介绍
const fraudTrans = [
    {
        title: '用户ID',
        // width: 100,
        dataIndex: 'user_id',
        key: 'user_id',
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
const dataShow = (handleDetail, handleDwoload, handleDelte) => {
    return [
        {
            title: '编号',
            width: 100,
            dataIndex: 'index',
            key: 'index',
            fixed: 'left',
        },
        {
            title: '数据描述',
            width: 300,
            dataIndex: 'description',
            key: 'ddescriptione',
            fixed: 'left',
        },
        {
            title: '上传时间',
            width: 100,
            dataIndex: 'date',
            key: 'date',
            fixed: 'left',
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 130,
            render: (item) => {
                return <div>
                    <Button type="link" onClick={() => handleDetail(item.fileKey)}>详情</Button>
                    <Button type="link" onClick={() => handleDwoload(item.fileKey)}>下载</Button>
                    <Popconfirm
                        title="警告"
                        description="确定要删除吗? 删除后使用该数据训练的模型也将删除"
                        onConfirm={() => handleDelte(item.fileKey)}
                        okText="确定"
                        cancelText="不是"
                    >
                        <Button type="link" danger>删除</Button>
                    </Popconfirm>
                </div>
            }
        }
    ];
}

const action = [
    {
        title: '用户ID',
        // width: 100,
        dataIndex: 'user_id',
        key: 'user_id',
        fixed: 'left',
    },
    {
        title: '用户姓名',
        // width: 100,
        dataIndex: 'userName',
        key: 'userName',
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
        title: '日期',
        // width: 100,
        dataIndex: 'sku_id',
        key: 'sku_id',
        fixed: 'left',
    },
    {
        title: '浏览次数',
        // width: 100,
        dataIndex: 'num',
        key: 'num',
        fixed: 'left',
    }
]

const sku = [
    {
        title: '商品ID',
        // width: 100,
        dataIndex: 'sku_id',
        key: 'sku_id',
        fixed: 'left',
    },
    {
        title: '价格',
        // width: 100,
        dataIndex: 'price',
        key: 'price',
        fixed: 'left',
    },
    {
        title: '品类编码',
        // width: 100,
        dataIndex: 'cate',
        key: 'cate',
        fixed: 'left',
    },
    {
        title: '品类名称',
        // width: 100,
        dataIndex: 'cateName',
        key: 'cateName',
        fixed: 'left',
    }
]
const comment = [
    {
        title: '用户ID',
        dataIndex: 'user_id',
        key: 'user_id',
        fixed: 'left',
    },
    {
        title: '订单编号',
        dataIndex: 'o_id',
        key: 'o_id',
        fixed: 'left',
    },
    {
        title: '评分',
        dataIndex: 'score',
        key: 'score',
        fixed: 'left',
    },

]
const order = [
    {
        title: '用户ID',
        dataIndex: 'user_id',
        key: 'user_id',
        fixed: 'left',
    },
    {
        title: '用户姓名',
        dataIndex: 'userName',
        key: 'userName',
        fixed: 'left',
    },
    {
        title: '商品ID',
        dataIndex: 'sku_id',
        key: 'sku_id',
        fixed: 'left',
    },
    {
        title: '订单编号',
        dataIndex: 'o_id',
        key: 'o_id',
        fixed: 'left',
    },
    {
        title: '日期',
        dataIndex: 'sku_id',
        key: 'sku_id',
        fixed: 'left',
    },
    {
        title: '地址代码',
        dataIndex: 'area',
        key: 'area',
        fixed: 'left',
    },
    {
        title: '地址',
        dataIndex: 'areaName',
        key: 'areaName',
        fixed: 'left',
    },
    {
        title: '购买数量',
        dataIndex: 'num',
        key: 'num',
        fixed: 'left',
    },
    {
        title: '付款方式',
        dataIndex: 'payType',
        key: 'payType',
        fixed: 'left',
    }
]

const model = [
    {
        title: '模型名字',
        dataIndex: 'name',
    },
    {
        title: '模型简介',
        dataIndex: 'info',
    },
    {
        title: '模型性能',
        dataIndex: 'performance',
        children: [
            {
                title: 'AUC',
                dataIndex: 'AUC',
                key: 'AUC',
            },
            {
                title: 'F1-Score',
                dataIndex: 'F1-Score',
                key: 'F1-Score',
            },
            {
                title: 'Recall',
                dataIndex: 'Recall',
                key: 'Recall',
            },
            {
                title: 'Precision',
                dataIndex: 'Precision',
                key: 'Precision',
            },
        ]
    },
];

export {
    dataShow,
    transaction,
    fraudTrans,
    action,
    sku,
    comment,
    order,
    model
}