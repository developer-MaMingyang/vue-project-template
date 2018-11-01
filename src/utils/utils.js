/*
* author: mamingyang@baofeng.com
* date: 2018/11/1
* usage: 全局公用方法
*/

import { Message } from 'element-ui';

// checkErrorCode: ajax全局错误码拦截
export const checkErrorCode = ({ errorCode, errorMessage }, ignore) => {
  if (!errorCode || errorCode === ignore) {
    Message.success('已经成功进行了一个请求');
    return true;
  }
  Message.error(`${errorMessage}(${errorCode})`);
  return false;
};
// checkErrorCode结束

// buildQueryUrl: 将url和一个对象转化并拼接
export const buildQueryUrl = (url, param) => {
  let x = url;
  let ba = true;
  if (x.indexOf('?') !== -1) {
    ba = x.indexOf('?') !== url.length - 1;
  } else {
    x += '?';
    ba = false;
  }
  let builder = '';
  for (const i in param) {
    const p = `&${i}=`;
    if (param[i]) {
      const v = param[i];
      if (Object.prototype.toString.call(v) === '[object Array]') {
        for (let j = 0; j < v.length; j++) {
          builder = builder + p + encodeURIComponent(v[j]);
        }
      } else if (typeof (v) === 'object' && Object.prototype.toString.call(v).toLowerCase() === '[object object]' && !v.length) {
        builder = builder + p + encodeURIComponent(JSON.stringify(v));
      } else {
        builder = builder + p + encodeURIComponent(v);
      }
    }
  }
  if (!ba) {
    builder = builder.substring(1);
  }
  return x + builder;
};

// buildQueryUrl结束

// getQueryString: 获取浏览器URL参数的值
export const getQueryString = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};
// getQueryString结束

// IEVersion: 判断IE浏览器版本
// 返回值    -1:非IE，6:≤ie6，7-11:ie7-ie11，edge: edge浏览器
export const IEVersion = () => {
  const userAgent = navigator.userAgent,
    isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1,
    isEdge = userAgent.indexOf('Edge') > -1 && !isIE,
    isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    const fIEVersion = parseFloat(RegExp.$1);
    if (fIEVersion === 7) {
      return 7;
    } else if (fIEVersion === 8) {
      return 8;
    } else if (fIEVersion === 9) {
      return 9;
    } else if (fIEVersion === 10) {
      return 10;
    }
    return 6;
  } else if (isEdge) {
    return 'edge';
  } else if (isIE11) {
    return 11;
  }
  return -1;
};
// IEVersion结束
