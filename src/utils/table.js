// 数据监控界面，交易展示
import { Button, message, Popconfirm } from "antd";

const transaction = [
    {
        title: '用户ID',
        // width: 100,
        dataIndex: 'user_id',
        key: 'user_id',
        fixed: 'left',
    },
    {
        title: '用户姓名',
        // width: 120,
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
        title: '商品种类',
        // width: 100,
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
        // width: 100,
        dataIndex: 'price',
        key: 'price',
        fixed: 'left',
    },
    {
        title: '交易方式',
        // width: 100,
        dataIndex: 'payType',
        key: 'payType',
        fixed: 'left',
    },

    {
        title: '标记',
        // width: 100,
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
            title: '文件ID',
            width: 100,
            dataIndex: 'fileID',
            key: 'fileID',
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
                    <Button  type="link" onClick={() => handleDetail(item.fileID)}>详情</Button>
                    <Button  type="link"  onClick={() => handleDwoload(item.fileID)}>下载</Button>
                    <Popconfirm
                        title="警告"
                        description="确定要删除吗? 删除后使用该数据训练的模型也将删除"
                        onConfirm={() => handleDelte(item.fileID)}
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

export {
    dataShow,
    transaction,
    fraudTrans
}