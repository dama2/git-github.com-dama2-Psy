import { request } from "../utils/request";

// 获取所有交易
export const getAllTransRecord = (params) => {
    return new Promise((resolve, reject) => {
        request.get('/api1/run2',{
           params
        }).then(response => {
            const data = response.data
            resolve(data)
        }).catch(error => {
            console.log('获取交易数据失败');
            reject(error)
        })
    })
}