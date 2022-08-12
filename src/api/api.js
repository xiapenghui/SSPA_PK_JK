// 引入封装好的axios
import axios from "./request";
//定义跨域代理路由

// const api =  'http://192.168.1.18:9528/WebAPI/api'
const api =  'http://10.177.34.15:23117/WebAPI/api'
// const api = process.env.NODE_ENV == 'development' ? '/api' : 'http://127.0.0.1:555/WebAPI/api'
//  /api 为配置跨域的路径变量

//图表一
export const GetLineIdText = (params) => {
    return axios.post(api + '/Common/GetLineIdText', params)
}


// 工位
export const GetStationIdText = (params) => {
    return axios.post(api + '/Common/GetStationIdText', params)
}



export const SearchWebOne = (params) => {
    return axios.post(api + '/DashbordMain/WebOne', params)
}
// 详情
export const SearchWebTheer = (params) => {
    return axios.post(api + '/DashbordMain/WebTheer', params)
}



//设备接口
export const  GetEquipmentIdText = (params) => {
    return axios.post(api + '/Common/GetEquipmentIdText', params)
}

export const  SearchWebTwo = (params) => {
    return axios.post(api + '/DashbordMain/WebTwo', params)
}



//线体关联工位
export const  Line_Station = (params) => {
    return axios.post(api + '/DashbordMain/Line_Station', params)
}

 
//线体关联设备
export const  Line_Equipment = (params) => {
    return axios.post(api + '/DashbordMain/Line_Equipment', params)
}