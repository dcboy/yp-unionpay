const url = require('url');
const moment = require('moment');
const pem = require('pem-promise');
const { Certificate } = require('@fidm/x509');
const request = require('request');
const util = require('./util');

const APIURL = {
  newAppTransUrl: 'https://gateway.95516.com/gateway/api/newAppTransReq.do',
}
class UnionPay {
  /**
     * 初始化
     * @param {Object} config 配置信息
     * - merid 商户ID
     */
  constructor(config) {
    this.config = config;

    // 基础参数
    this.baseOptions = {
      version: '5.1.0',
      encoding: 'UTF-8',
    }
  }

  /** 
   * 获取用户授权信息
  */
  getAppUpIdentifier (params) {
    return new Promise((resolve, reject) => {
      // 本接口的固定参数
      let options = {
        appUpIdentifier: '(UnionPay/1.0 CloudPay)',
        certId: this.config.certId,
        signMethod: '01',
        txnType: '00',
        txnSubType: '10',
        bizType: '000000',
        channelType: '08',
        accessType: '0',
        merId: this.config.merId,
        txnTime: moment().format('YYYYMMDDHHmmss'),
      };

      params = Object.assign({}, this.baseOptions, options, params);

      // 签名
      params = util.signatureGenerate(params, this.config.privateKey);

      /** 
        *  accessType: '0',
        *  appUserId: 'n8xBMa+IhTa3ZJ4fkU1BMbyFuQ2iYNeFadgzEEhOFe/jNwIBjM/rLR6U+nrM0jLk',
        *  bizType: '000000',
        *  encoding: 'UTF-8',
        *  merId: '898440353313553',
        *  orderId: '1547622413668',
        *  respCode: '00',
        *  respMsg: '成功[0000000]',
        *  signMethod: '01',
        *  txnSubType: '10',
        *  txnTime: '20190116150653',
        *  txnType: '00',
        *  version: '5.1.0',
      */
      try {
        request.post(APIURL.newAppTransUrl, { form: params }, (err, response, body) => {
          if (err) {
            throw (new Error(err));
          }
          const paramsObject = util.transferParams(body);

          if (util.verify(paramsObject)) {
            return resolve(paramsObject);
          } else {
            return reject(new Error(`ERR_SING_INVALID`));
          }
        });
      } catch (ex) {
        return reject(new Error(`生成订单时候发生错误:${ex}`));
      }
    })
  }



  refunds (params) {
    return new Promise((resolve, reject) => {
      let options = {
        certId: this.config.certId,
        signMethod: '01',
        txnType: '04',
        txnSubType: '00',
        bizType: '000000',
        channelType: '08',
        accessType: '0',
        merId: this.config.merId,
        txnTime: moment().format('YYYYMMDDHHmmss'),
        // orderId:'',
        // backUrl: '',
        // origQryId:'',
        // txnAmt:'',
      };

      params = Object.assign({}, this.baseOptions, options, params);

      // 签名
      params = util.signatureGenerate(params, this.config.privateKey);

      try {
        request.post(APIURL.newAppTransUrl, { form: params }, (err, response, body) => {
          if (err) {
            throw (new Error(err));
          }
          const paramsObject = util.transferParams(body);
          if (util.verify(paramsObject)) {
            return resolve(paramsObject);
          } else {
            return reject(new Error(`签名校验错误`));
          }
        });
      } catch (ex) {
        return reject(new Error(`生成订单时候发生错误:${ex}`));
      }
    });
  }

  /**
  * @description 创建支付订单的操作
  */
  createQRCodeOrder (params) {
    return new Promise((resolve, reject) => {
      let options = {
        certId: this.config.certId,
        signMethod: '01',
        txnType: '01',
        txnSubType: '01',
        bizType: '000000',
        channelType: '07',
        tradeType: 'mobileWeb',
        accessType: '0',
        merId: this.config.merId,
        txnTime: moment().format('YYYYMMDDHHmmss'),
        currencyCode: '156',
      };

      params = Object.assign({}, this.baseOptions, options, params);

      // 签名
      params = util.signatureGenerate(params, this.config.privateKey);

      try {
        request.post(APIURL.newAppTransUrl, { form: params }, (err, response, body) => {
          if (err) {
            throw (new Error(err));
          }
          const paramsObject = util.transferParams(body);
          if (util.verify(paramsObject)) {
            return resolve(paramsObject);
          } else {
            return reject(new Error(`签名校验错误`));
          }
        });
      } catch (ex) {
        return reject(new Error(`生成订单时候发生错误:${ex}`));
      }
    });
  }

  /** 
   * 校验回调参数
  */
  static verifyNotify (params) {
    if (!params) {
      return false;
    }
    return util.verify(params)
  }

  /** 
   * @description 转换证书
  */
  static async processPfx (pfxBuffer, password) {
    try {
      // 解析证书
      const data = await pem.readPkcs12(pfxBuffer, { p12Password: password });
      const certData = Certificate.fromPEM(data.cert);
      const certId = util.hexToDecimal(certData.serialNumber);

      console.log(certId);

      return {
        certId,
        privateKey: data.key,
        publicKey: data.cert,
      }
    } catch (e) {
      throw e;
    }

    return false
  }

}

module.exports = UnionPay;