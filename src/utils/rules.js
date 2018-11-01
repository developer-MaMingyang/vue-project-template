/*
* author: mamingyang@baofeng.com
* date: 2018/10/24
*/

// 校验手机号
export const checkPhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号'));
  }
  if (!(/^1[34578]\d{9}$/.test(value))) {
    callback(new Error('请输入正确的手机号'));
    return false;
  }
  callback();
};

// 校验密码：必填且6-16位非空白字符
export const checkPwd = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  }
  if (/\s/.test(value) || !(/^\S{6,16}$/.test(value))) {
    callback(new Error('密码应为6-16位字母，数字或英文符号组成'));
    return false;
  }
  callback();
};

// 校验图形验证码：4位中英文数字
export const checkImgVc = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入图形验证码'));
  }
  if (!/^[a-zA-Z0-9]{4}$/.test(value)) {
    callback(new Error('请输入正确的图形验证码'));
  }
  callback();
};

// 校验短信验证码：6位纯数字
export const checkMsgVc = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入短信验证码'));
  }
  if (!/^[0-9]{6}$/.test(value)) {
    callback(new Error('请输入正确的短信验证码'));
  }
  callback();
};
