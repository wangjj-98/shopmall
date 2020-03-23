import axios from 'axios'

export function request (config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/wh',
    timeout: 1000,
  });
  instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    return config;
  }, err => {

  });
  instance.interceptors.response.use(res => {
    // 对响应数据做点什么
    return res.data;
  }, err => {
    console.log(err);
  });
  return instance(config)
}