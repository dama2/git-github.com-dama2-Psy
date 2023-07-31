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

// 获取上传数据集的错误信息
export const getUploadError = (params) => {
    return new Promise((resolve, reject) => {
        request.get('/api2/getDetail',{
        params
     }).then(response => {
            const data = response.data
            resolve(data)
        }).catch(error => {
            console.log('文件分析失败');
            reject(error)
        })
    })
}

// 上传数据到数据库
export const saveDate = (params) => {
    return new Promise((resolve, reject) => {
        request.post('/api2/saveData',null,{params:{...params}}).then(response => {
            const data = response.data
            resolve(data)
        }).catch(error => {
            console.log('上传失败');
            reject(error)
        })
    })
}

// 获取数据集的大小
export const getDateSize = (params) => {
    return new Promise((resolve, reject) => {
        request.get('/api1/dataSize',{
        params
     }).then(response => {
            const data = response.data
            resolve(data)
        }).catch(error => {
            console.log('获取数据集大小失败');
            reject(error)
        })
    })
}

// 获取表格的具体内容
export const dataRecore = (params) => {
    return new Promise((resolve, reject) => {
        request.get('/api1/dataRecore',{
        params
     }).then(response => {
            const data = response.data
            resolve(data)
        }).catch(error => {
            console.log('获取表格数据失败');
            reject(error)
        })
    })
}

// 获取表格的具体内容
export const dataRecord = (params) => {
    return new Promise((resolve, reject) => {
        request.get('/api1/dataRecord',{
        params
     }).then(response => {
            const data = response.data
            resolve(data)
        }).catch(error => {
            console.log('获取表格数据失败');
            reject(error)
        })
    })
}