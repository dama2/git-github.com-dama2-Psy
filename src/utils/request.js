import axios from 'axios'

export const request = axios.create({
    baseURL: 'http://localhost:3000', // 基本地址
    timeout: 50000, // 延迟时长
    headers: {
        "Content-Type": 'application/json;charset=utf-8'
    }
})