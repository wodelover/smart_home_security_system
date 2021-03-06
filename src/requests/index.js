// 导入axios用于http数据通信
import axios from 'axios'
// 导入qs模块用于格式化字符串为json
import qs from 'qs'

const ajax = axios.create({
    // 定义默认URL
    baseURL: "http://192.168.1.160:8080"
})

// 登录接口
export const userLogin = (username, password) => {
    return ajax({
        url: '/login',
        method: 'post',
        responseType: 'json',
        data: qs.stringify({ 'username': username, 'password': password })
    })
}

// 打开蜂鸣器接口
export const changeBeepStatus = (beepStatus) => {
    return ajax({
        url: '/beep',
        method: 'post',
        responseType: 'json',
        data: qs.stringify({ 'beepStatus': beepStatus })
    })
}

// 打开换气接口
export const changeAirStatus = (airStatus) => {
    return ajax({
        url: '/air',
        method: 'post',
        responseType: 'json',
        data: qs.stringify({ 'airStatus': airStatus })
    })
}

// GET获取室内照明、换气、恒温状态信息接口
export const getControlDefaultStatus = () => {
    return ajax('/controlDefaultStatus')
}

// GET获取室内温度、湿度、可燃气体、宠物状态信息接口
export const getHomeDefaultStatus = () => {
    return ajax('/homeDefaultStatus')
}