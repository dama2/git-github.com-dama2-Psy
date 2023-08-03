import { request } from "../utils/request";

// 获取所有交易
export const getAllTransRecord = (params) => {
    return new Promise((resolve, reject) => {
        request.get('/api1/monitor',{
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


// 获取所有异常交易
export const getFruadTrans = (params) => {
    return new Promise((resolve, reject) => {
        request.get('/api1/examine',{
           params
        }).then(response => {
            const data = response.data
            resolve(data)
        }).catch(error => {
            console.log('获取异常交易失败');
            reject(error)
        })
    })
}

// 获取所有异常交易
export const changeStatus = (params) => {
    return new Promise((resolve, reject) => {
        request.get('/api1/result',{
           params
        }).then(response => {
            const data = response.data
            resolve(data)
        }).catch(error => {
            console.log('获取异常交易失败');
            reject(error)
        })
    })
}

// 实时获取交易统计信息
export const getStaticsInfo = (params) => {
    return new Promise((resolve, reject) => {
        request.get('/api1/getTransDetail',{
           params
        }).then(response => {
            const data = response.data
            resolve(data)
        }).catch(error => {
            console.log('获取统计信息失败');
            reject(error)
        })
    })
}

// 获取历史交易中用户所体现的交易特征
export const getBasicVec = (params) => {
    return new Promise((resolve, reject) => {
        request.get('/api1/details',{
           params
        }).then(response => {
            const data = response.data
            resolve(data)
        }).catch(error => {
            console.log('获取基准向量失败');
            reject(error)
        })
    })
}