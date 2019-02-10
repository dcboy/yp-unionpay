'use strict';

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _bigInteger = require('big-integer');

var _bigInteger2 = _interopRequireDefault(_bigInteger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = {
  createLinkString(params, encode, status) {
    let ks;
    let str = '';
    if (status === true) {
      ks = Object.keys(params).sort();
    } else {
      ks = Object.keys(params);
    }
    for (let i = 0; i < ks.length; i += 1) {
      let k = ks[i];
      if (encode === true) {
        k = encodeURIComponent(k);
      }
      if (str.length > 0) {
        str += '&';
      }
      if (k !== null && k !== undefined && k !== '') {
        // 如果参数的值为空不参与签名；
        str += `${k}=${params[k]}`;
        // str = str + k + '=' + params[k];
      }
    }
    return str;
  },
  /**
  * @description  生产签名(算法是sha256)
  * @param {Object} params       -签名所需要的参数
  * @param {String} privateKey   -签名所需要的私钥
  */
  signatureGenerate(params, privateKey) {
    const newObj = params;
    if (Object.prototype.toString(params) === '[object Object]' && typeof privateKey === 'string') {
      const prestr = utils.createLinkString(params, true, true);
      const sha1 = _crypto2.default.createHash('sha256');
      sha1.update(prestr, 'utf8');
      const ss1 = sha1.digest('hex');
      // 私钥签名
      const sign = _crypto2.default.createSign('sha256');
      sign.update(ss1);
      const sig = sign.sign(privateKey, 'base64');
      newObj.signature = sig;
    } else {
      return false;
    }
    return newObj;
  },
  hexToDecimal(hexStr) {
    return (0, _bigInteger2.default)(hexStr, 16).toString();
  },
  transferParams(body) {
    const splitParams = body.split('&');
    console.log(splitParams);
    const params = {};
    for (let i = 0; i < splitParams.length; i++) {
      const [key, ...others] = splitParams[i].split('=');
      params[key] = others.join('=');
    }
    return params;
  },
  filterPara(params) {
    const obj = {};
    Object.keys(params).forEach(k => {
      const newK = k;
      if (newK !== 'signature' && params[k]) {
        obj[k] = params[k];
      }
    });
    return obj;
  },
  verify(params) {
    // 提供校验数据
    const signatureStr = params.signature;
    const params1 = utils.filterPara(params);
    const prestr = utils.createLinkString(params1, true, true);

    const publicKey = params.signPubKeyCert;
    // 以下部分为公钥验签名
    const sha1 = _crypto2.default.createHash('sha256');
    sha1.update(prestr, 'utf8');
    const ss1 = sha1.digest('hex');

    // 公钥验签
    const verifier = _crypto2.default.createVerify('sha256');
    verifier.update(ss1);

    const verifyResult = verifier.verify(publicKey, signatureStr, 'base64');
    return verifyResult;
  }
};

module.exports = utils;