/*
* author: mamingyang@baofeng.com
* date: 2018/11/1
*/

import { $post } from '../utils/request';

// 请求示例
export const getData = ({ el }) => $post({
  url: '/wfduc/client/investor/baseaccount/accountInfoNew',
  params: { a: 1 }, // Query String Parameters
  data: { b: 2 }, // Request Payload
  el,
  ignore: 10002,
});
