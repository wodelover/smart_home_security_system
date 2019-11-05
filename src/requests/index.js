// 导入axios用于http数据通信
import axios from 'axios'
// 导入qs模块用于格式化字符串为json
import qs from 'qs'

const ajax = axios.create({
    // 定义默认URL
    baseURL: "http://localhost:8080"
})

// 登录接口
export const userLogin = (username, password) => {
    return ajax({
        url: '/login',
        method: 'post',
        responseType: 'json',
        data: qs.stringify({'username': username, 'password': password})
    })
}

// 打开照明接口
export const changeLightStatus = (lightStatus) => {
    return ajax({
        url: '/light',
        method: 'post',
        responseType: 'json',
        data: qs.stringify({'lightStatus': lightStatus})
    })
}

// 打开换气接口
export const changeAirStatus = (airStatus) => {
    return ajax({
        url: '/air',
        method: 'post',
        responseType: 'json',
        data: qs.stringify({'airStatus': airStatus})
    })
}

// 打开恒温接口
export const changeKeepTempStatus = (keepTempStatus) => {
    return ajax({
        url: '/keepTemp',
        method: 'post',
        responseType: 'json',
        data: qs.stringify({'keepTempStatus': keepTempStatus})
    })
}

// GET获取室内照明、换气、恒温状态信息接口
export const getControlDefaultStatus =() =>{
    return ajax('/controlDefaultStatus')
}

// GET获取室内温度、可燃气体、宠物状态信息接口
export const getPetDefaultStatus =() =>{
    return ajax('/petDefaultStatus')
}