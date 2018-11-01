/*eslint-disable*/
/*
* author: mamingyang@baofeng.com
* date: 2018/10/24
* usage: 全局请求函数。用法：在services文件夹调用$post或者$get。
*/

import axios from 'axios';
import { Notification, Loading } from 'element-ui';
import {buildQueryUrl, checkErrorCode} from "./utils";

let cancel; const promiseArr = {};
const CancelToken = axios.CancelToken;
// 请求拦截器
axios.interceptors.request.use((config) => {
  // 发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消');
    promiseArr[config.url] = cancel;
  } else {
    promiseArr[config.url] = cancel;
  }
  return config;
}, error => Promise.reject(error));

// 响应拦截器即异常处理
axios.interceptors.response.use(response => response, (err) => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求。';
        break;
      case 401:
        err.message = '未授权。';
        break;
      case 403:
        err.message = '拒绝访问。';
        break;
      case 404:
        err.message = '未找到该资源。';
        break;
      case 405:
        err.message = '请求方法未允许。';
        break;
      case 408:
        err.message = '请求超时。';
        break;
      case 500:
        err.message = '服务器端出错。';
        break;
      case 501:
        err.message = '网络未实现。';
        break;
      case 502:
        err.message = '网络错误。';
        break;
      case 503:
        err.message = '服务不可用。';
        break;
      case 504:
        err.message = '网络超时。';
        break;
      case 505:
        err.message = 'http版本不支持该请求。';
        break;
      default:
        err.message = `连接错误。`;
    }
  } else {
    err.message = '连接到服务器失败';
  }
  Notification.error({
    title: `错误${err.response.status}`,
    message: `${err.message}`,
  });
  return Promise.resolve(err.response);
});

axios.defaults.baseURL = '/';

axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
};
axios.defaults.timeout = 10000;

// get请求
export const $get = ({ url, params, ignore, el }) => new Promise((resolve, reject) => {
  let sending = null;
  if (el && document.querySelector(el)) {
    sending = Loading.service({
      target: document.querySelector(el)
    });
  }
  axios({
    method: 'get',
    url,
    params,
    cancelToken: new CancelToken((c) => {
      cancel = c;
    }),
  }).then(({data}) => {
    if (sending) sending.close();
    if (checkErrorCode(data, ignore)) {
      resolve(data, ignore);
    }
  });
});
// post请求
export const $post = ({ url, params, data, ignore, el }) => new Promise((resolve, reject) => {
  let sending = null;
  if (el && document.querySelector(el)) {
    sending = Loading.service({
      target: document.querySelector(el)
    });
  }
  axios({
    method: 'post',
    url: buildQueryUrl(url, params),
    data,
    cancelToken: new CancelToken((c) => {
      cancel = c;
    }),
  }).then(({data}) => {
    if (sending) sending.close();
    if (checkErrorCode(data, ignore)) {
      resolve(data, ignore);
    }
  });
});
