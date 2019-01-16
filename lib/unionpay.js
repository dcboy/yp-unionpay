'use strict';

const url = require('url');
const moment = require('moment');
const pem = require('pem-promise');
const wopenssl = require('wopenssl');
const request = require('request');
const util = require('./util');

const APIURL = {
  newAppTransUrl: 'https://gateway.95516.com/gateway/api/newAppTransReq.do'
};
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
      encoding: 'UTF-8'
    };
  }

  /** 
   * 获取用户授权信息
  */
  getAppUpIdentifier(params) {
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
        txnTime: moment().format('YYYYMMDDHHmmss')
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
            throw new Error(err);
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
    });
  }

  /**
  * @description 创建支付订单的操作
  */
  createQRCodeOrder(params) {
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
        currencyCode: '156'
      };

      params = Object.assign({}, this.baseOptions, options, params);

      // 签名
      params = util.signatureGenerate(params, this.config.privateKey);

      console.log(`result:${JSON.stringify(params)}`);

      try {
        request.post(APIURL.newAppTransUrl, { form: params }, (err, response, body) => {
          if (err) {
            throw new Error(err);
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

  // /**
  //  * @description 查询订单交易状态的操作
  //  * @param {String} orderIdNo  - 用户支付订单号
  //  * @param {String} txnTime    - 订单提交到银联的时间，需要格式为YYYYMMDDHHmmss
  //  */
  // query(orderIdNo, txnTime) {
  //   return new Promise((resolve, reject) => {
  //     const necessaryParams = {
  //       version: '5.1.0',
  //       encoding: 'utf-8',
  //       signMethod: '01',
  //       txnType: '00',
  //       txnSubType: '00',
  //       bizType: '000000',
  //       accessType: '0',
  //       channelType: '07',
  //       orderId: orderIdNo,
  //       merId: this.config.merId,
  //       txnTime: txnTime,
  //       certId: this.config.certId,
  //     };
  //     const result = signHelper.signatureGenerate(necessaryParams, this.config.privateKey);
  //     try {
  //       request.post(this.config.queryTransUrl, { form: result }, (err, response, body) => {
  //         const splitedString = body.split('&');
  //         const paramsObject = utilities.transferParams(splitedString);
  //         console.log(paramsObject)
  //         return resolve(paramsObject);
  //       });
  //     } catch (ex) {
  //       return reject(new Error('查询订单时候发生错误'));
  //     }
  //     return true;
  //   });
  // }

  // /**
  //  * @description 用来验证银联回调签名
  //  * @param {Object} params    - 支付成功之后银联回调的数据
  //  */
  // verifyCallback(params) {
  //   this.result = verify.verify(params);
  //   return this.result;
  // }

  /** 
   * @description 转换证书
  */
  static async processPfx(pfxBuffer, password) {
    try {
      // 解析证书
      const data = await pem.readPkcs12(pfxBuffer, { p12Password: password });

      // 获取
      const certData = wopenssl.x509.parseCert(data.cert);
      //
      const certId = util.hexToDecimal(certData.serial);

      return {
        certId,
        privateKey: data.key,
        publicKey: data.cert
      };
    } catch (e) {}

    return false;
  }

}

module.exports = UnionPay;