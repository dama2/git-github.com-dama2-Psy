import { request } from "../utils/request";

// 获取所有数据集
export const getAllDataSet = () => {
    return new Promise((resolve, reject) => {
        request.get('/api1/getAllData').then(response => {
            const data = response.data
            resolve(data)
        }).catch(error => {
            console.log('获取数据集信息失败');
            reject(error)
        })
    })
}