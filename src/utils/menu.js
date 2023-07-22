export default [
    {
      label: '首页',
      key: '/home',
    },
    {
      label: '交易监控',
      key: '/tmonitor',
    },
    {
      label: '交易审核',
      key: '/treview',
    },
    {
      label: '数据配置',
      key: '/dataConfig',
      children: [
        {
          label: '上传数据',
          key: '/dataConfig/upload',
        },
        {
          label: '数据配置',
          key: '/dataConfig/dataDetail',
        },
      ]
    },
  ];