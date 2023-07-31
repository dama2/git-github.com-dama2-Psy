import { request } from "../utils/request";

// 获取所有数据集
export const getCommentPie = (params) => {
    return new Promise((resolve, reject) => {
        request.get('/api1/commentPie',{
            params
         }).then(response => {
            const data = response.data
            resolve(data)
        }).catch(error => {
            console.log('获取评论数据集的饼图数据有误');
            reject(error)
        })
    })
}

// 获取所有数据集
export const getOrderPie = (params) => {
    return new Promise((resolve, reject) => {
        request.get('/api1/orderPie',{
            params
         }).then(response => {
            const data = response.data
            resolve(data)
        }).catch(error => {
            console.log('获取订单表格的数据有误');
            reject(error)
        })
    })
}

// 获取所有数据集
export const getOrderPie1 = (params) => {
    return new Promise((resolve, reject) => {
        request.get('/api1/orderPie1',{
            params
         }).then(response => {
            const data = response.data
            resolve(data)
        }).catch(error => {
            console.log('获取订单表格的数据有误');
            reject(error)
        })
    })
}
