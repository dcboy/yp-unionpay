const UnionPay = require('../src/unionpay');
const fs = require('fs');
const path = require('path');
const pem = require('pem-promise');
const wopenssl = require('wopenssl');
const BigInt = require('big-integer');

(async () => {

  // const pfxBuffer = fs.readFileSync(path.resolve(`${__dirname}/777290058162560.pfx`));
  // const config = await UnionPay.processPfx(pfxBuffer, '000000');
  // config.merId = "777290058162560";
  // config.newAppTransUrl = 'https://gateway.test.95516.com/gateway/api/newAppTransReq.do';

  let pfxBuffer = fs.readFileSync(path.resolve(`./config/898440353313553.pfx`));
  // pfxBuffer = pfxBuffer.toString('base64');
  const config = await UnionPay.processPfx(pfxBuffer, '123789');
  config.merId = "898440353313553";

  const unionPay = new UnionPay(config);

  // const response = await unionPay.createQRCodeOrder({
  //   txnAmt: 1,
  //   orderId: (new Date()).getTime().toString(),
  //   backUrl: 'http://094e4468.ngrok.io',
  //   appUserId: '123',
  //   termId: '12345678'
  // });

  const response = await unionPay.getAppUpIdentifier({
    userAuthCode: 'uskMsSXHS1KBLHZ90+iDzA==',
    orderId: (new Date()).getTime().toString(),
  });
  console.log(response);
})();