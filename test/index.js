const fs = require('fs');
const path = require('path');
const Config = require('../config/');
const UnionPay = require('../src/unionpay');

/**
{ accessType: '0',
  bizType: '000000',
  currencyCode: '156',
  encoding: 'UTF-8',
  merId: '898440353313553',
  orderId: '1547629517352',
  queryId: '151901161705179895688',
  respCode: '00',
  respMsg: '成功[0000000]',
  settleAmt: '1',
  settleCurrencyCode: '156',
  settleDate: '0116',
  signMethod: '01',
  signPubKeyCert: '-----BEGIN CERTIFICATE-----\r\nMIIEIDCCAwigAwIBAgIFEDRVM3AwDQYJKoZIhvcNAQEFBQAwITELMAkGA1UEBhMC\r\nQ04xEjAQBgNVBAoTCUNGQ0EgT0NBMTAeFw0xNTEwMjcwOTA2MjlaFw0yMDEwMjIw\r\nOTU4MjJaMIGWMQswCQYDVQQGEwJjbjESMBAGA1UEChMJQ0ZDQSBPQ0ExMRYwFAYD\r\nVQQLEw1Mb2NhbCBSQSBPQ0ExMRQwEgYDVQQLEwtFbnRlcnByaXNlczFFMEMGA1UE\r\nAww8MDQxQDgzMTAwMDAwMDAwODMwNDBA5Lit5Zu96ZO26IGU6IKh5Lu95pyJ6ZmQ\r\n5YWs5Y+4QDAwMDE2NDkzMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA\r\ntXclo3H4pB+Wi4wSd0DGwnyZWni7+22Tkk6lbXQErMNHPk84c8DnjT8CW8jIfv3z\r\nd5NBpvG3O3jQ/YHFlad39DdgUvqDd0WY8/C4Lf2xyo0+gQRZckMKEAId8Fl6/rPN\r\nHsbPRGNIZgE6AByvCRbriiFNFtuXzP4ogG7vilqBckGWfAYaJ5zJpaGlMBOW1Ti3\r\nMVjKg5x8t1/oFBkpFVsBnAeSGPJYrBn0irfnXDhOz7hcIWPbNDoq2bJ9VwbkKhJq\r\nVz7j7116pziUcLSFJasnWMnp8CrISj52cXzS/Y1kuaIMPP/1B0pcjVqMNJjowooD\r\nOxID3TZGfk5V7S++4FowVwIDAQABo4HoMIHlMB8GA1UdIwQYMBaAFNHb6YiC5d0a\r\nj0yqAIy+fPKrG/bZMEgGA1UdIARBMD8wPQYIYIEchu8qAQEwMTAvBggrBgEFBQcC\r\nARYjaHR0cDovL3d3dy5jZmNhLmNvbS5jbi91cy91cy0xNC5odG0wNwYDVR0fBDAw\r\nLjAsoCqgKIYmaHR0cDovL2NybC5jZmNhLmNvbS5jbi9SU0EvY3JsMjI3Mi5jcmww\r\nCwYDVR0PBAQDAgPoMB0GA1UdDgQWBBTEIzenf3VR6CZRS61ARrWMto0GODATBgNV\r\nHSUEDDAKBggrBgEFBQcDAjANBgkqhkiG9w0BAQUFAAOCAQEAHMgTi+4Y9g0yvsUA\r\np7MkdnPtWLS6XwL3IQuXoPInmBSbg2NP8jNhlq8tGL/WJXjycme/8BKu+Hht6lgN\r\nZhv9STnA59UFo9vxwSQy88bbyui5fKXVliZEiTUhjKM6SOod2Pnp5oWMVjLxujkk\r\nWKjSakPvV6N6H66xhJSCk+Ref59HuFZY4/LqyZysiMua4qyYfEfdKk5h27+z1MWy\r\nnadnxA5QexHHck9Y4ZyisbUubW7wTaaWFd+cZ3P/zmIUskE/dAG0/HEvmOR6CGlM\r\n55BFCVmJEufHtike3shu7lZGVm2adKNFFTqLoEFkfBO6Y/N6ViraBilcXjmWBJNE\r\nMFF/yA==\r\n-----END CERTIFICATE-----',
  traceNo: '989568',
  traceTime: '0116170557',
  txnAmt: '1',
  txnSubType: '01',
  txnTime: '20190116170517',
  txnType: '01',
  version: '5.1.0',
  signature: 'CJTXVcykQ6Jp8n1xW99V3OSLn4itycTWLHMaNtEVHRXy+iD3yLPTWRwCA23V5BJgAIuY7MuSZIWmi7b7/F8mG+8SwPLZFtaE5AZzDt4U6qh9HpYnoqSmB3me3XsqxfOnuX7UWMiCxTiydrfdk9Cso5Voims1vWuMysrlIHtpXKe5qXojzF8oJqp9zFNaLPOm9jk88W+CtxsQX+tVbu989pWDetVSrUDOM5T2agPlOzj7dz+3BisbVRImYroDboFSrm4D4wHQcaSZBWPOhv6e481SbZ5/kv+TF7U/o0xY/b0vU+1fWYKpOkOvtCu6ZPsEUK/CxIASFHG0GGy6J71f+w==' }
 */
(async () => {

  // const pfxBuffer = fs.readFileSync(path.resolve(`${__dirname}/777290058162560.pfx`));
  // const config = await UnionPay.processPfx(pfxBuffer, '000000');
  // config.merId = "777290058162560";
  // config.newAppTransUrl = 'https://gateway.test.95516.com/gateway/api/newAppTransReq.do';

  let pfxBuffer = fs.readFileSync(path.resolve(`./config/898440353313553.pfx`));
  // console.log(pfxBuffer.toString('base64'));
  const config = await UnionPay.processPfx(pfxBuffer, Config.password);
  config.merId = "898440353313553";

  const unionPay = new UnionPay(config);

  const response = await unionPay.createQRCodeOrder({
    txnAmt: 1,
    orderId: (new Date()).getTime().toString(),
    backUrl: 'http://6a3fdecd.ngrok.yopoint.cc:81/unionpay/gateway/notify/5c3eeaeccb2e21b9b64f35e0',
    appUserId: 'n8xBMa+IhTa3ZJ4fkU1BMbyFuQ2iYNeFadgzEEhOFe/jNwIBjM/rLR6U+nrM0jLk',
  });
  console.log(response);

  // const response = await unionPay.getAppUpIdentifier({
  //   userAuthCode: 'uskMsSXHS1KBLHZ90+iDzA==',
  //   orderId: (new Date()).getTime().toString(),
  // });

  // const data = {
  //   accessType: '0',
  //   bizType: '000000',
  //   currencyCode: '156',
  //   encoding: 'UTF-8',
  //   merId: '898440353313553',
  //   orderId: '1547629517352',
  //   queryId: '151901161705179895688',
  //   respCode: '00',
  //   respMsg: '成功[0000000]',
  //   settleAmt: '1',
  //   settleCurrencyCode: '156',
  //   settleDate: '0116',
  //   signMethod: '01',
  //   signPubKeyCert: '-----BEGIN CERTIFICATE-----\r\nMIIEIDCCAwigAwIBAgIFEDRVM3AwDQYJKoZIhvcNAQEFBQAwITELMAkGA1UEBhMC\r\nQ04xEjAQBgNVBAoTCUNGQ0EgT0NBMTAeFw0xNTEwMjcwOTA2MjlaFw0yMDEwMjIw\r\nOTU4MjJaMIGWMQswCQYDVQQGEwJjbjESMBAGA1UEChMJQ0ZDQSBPQ0ExMRYwFAYD\r\nVQQLEw1Mb2NhbCBSQSBPQ0ExMRQwEgYDVQQLEwtFbnRlcnByaXNlczFFMEMGA1UE\r\nAww8MDQxQDgzMTAwMDAwMDAwODMwNDBA5Lit5Zu96ZO26IGU6IKh5Lu95pyJ6ZmQ\r\n5YWs5Y+4QDAwMDE2NDkzMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA\r\ntXclo3H4pB+Wi4wSd0DGwnyZWni7+22Tkk6lbXQErMNHPk84c8DnjT8CW8jIfv3z\r\nd5NBpvG3O3jQ/YHFlad39DdgUvqDd0WY8/C4Lf2xyo0+gQRZckMKEAId8Fl6/rPN\r\nHsbPRGNIZgE6AByvCRbriiFNFtuXzP4ogG7vilqBckGWfAYaJ5zJpaGlMBOW1Ti3\r\nMVjKg5x8t1/oFBkpFVsBnAeSGPJYrBn0irfnXDhOz7hcIWPbNDoq2bJ9VwbkKhJq\r\nVz7j7116pziUcLSFJasnWMnp8CrISj52cXzS/Y1kuaIMPP/1B0pcjVqMNJjowooD\r\nOxID3TZGfk5V7S++4FowVwIDAQABo4HoMIHlMB8GA1UdIwQYMBaAFNHb6YiC5d0a\r\nj0yqAIy+fPKrG/bZMEgGA1UdIARBMD8wPQYIYIEchu8qAQEwMTAvBggrBgEFBQcC\r\nARYjaHR0cDovL3d3dy5jZmNhLmNvbS5jbi91cy91cy0xNC5odG0wNwYDVR0fBDAw\r\nLjAsoCqgKIYmaHR0cDovL2NybC5jZmNhLmNvbS5jbi9SU0EvY3JsMjI3Mi5jcmww\r\nCwYDVR0PBAQDAgPoMB0GA1UdDgQWBBTEIzenf3VR6CZRS61ARrWMto0GODATBgNV\r\nHSUEDDAKBggrBgEFBQcDAjANBgkqhkiG9w0BAQUFAAOCAQEAHMgTi+4Y9g0yvsUA\r\np7MkdnPtWLS6XwL3IQuXoPInmBSbg2NP8jNhlq8tGL/WJXjycme/8BKu+Hht6lgN\r\nZhv9STnA59UFo9vxwSQy88bbyui5fKXVliZEiTUhjKM6SOod2Pnp5oWMVjLxujkk\r\nWKjSakPvV6N6H66xhJSCk+Ref59HuFZY4/LqyZysiMua4qyYfEfdKk5h27+z1MWy\r\nnadnxA5QexHHck9Y4ZyisbUubW7wTaaWFd+cZ3P/zmIUskE/dAG0/HEvmOR6CGlM\r\n55BFCVmJEufHtike3shu7lZGVm2adKNFFTqLoEFkfBO6Y/N6ViraBilcXjmWBJNE\r\nMFF/yA==\r\n-----END CERTIFICATE-----',
  //   traceNo: '989568',
  //   traceTime: '0116170557',
  //   txnAmt: '1',
  //   txnSubType: '01',
  //   txnTime: '20190116170517',
  //   txnType: '01',
  //   version: '5.1.0',
  //   signature: 'CJTXVcykQ6Jp8n1xW99V3OSLn4itycTWLHMaNtEVHRXy+iD3yLPTWRwCA23V5BJgAIuY7MuSZIWmi7b7/F8mG+8SwPLZFtaE5AZzDt4U6qh9HpYnoqSmB3me3XsqxfOnuX7UWMiCxTiydrfdk9Cso5Voims1vWuMysrlIHtpXKe5qXojzF8oJqp9zFNaLPOm9jk88W+CtxsQX+tVbu989pWDetVSrUDOM5T2agPlOzj7dz+3BisbVRImYroDboFSrm4D4wHQcaSZBWPOhv6e481SbZ5/kv+TF7U/o0xY/b0vU+1fWYKpOkOvtCu6ZPsEUK/CxIASFHG0GGy6J71f+w=='
  // }

  // const response = unionPay.validNotify(data);

  /**
    * {
    * 	accessType: '0',
    * 	bizType: '000000',
    * 	encoding: 'UTF-8',
    * 	merId: '898440353313553',
    * 	orderId: '1547632524375',
    * 	origQryId: '151901161705179895688',
    * 	queryId: '151901161755249910108',
    * 	respCode: '00',
    * 	respMsg: '成功[0000000]',
    * 	signMethod: '01',
    * 	txnAmt: '1',
    * 	txnSubType: '00',
    * 	txnTime: '20190116175524',
    * 	txnType: '04',
    * 	version: '5.1.0',
    * 	signPubKeyCert: '-----BEGIN CERTIFICATE-----\r\nMIIEIDCCAwigAwIBAgIFEDRVM3AwDQYJKoZIhvcNAQEFBQAwITELMAkGA1UEBhMC\r\nQ04xEjAQBgNVBAoTCUNGQ0EgT0NBMTAeFw0xNTEwMjcwOTA2MjlaFw0yMDEwMjIw\r\nOTU4MjJaMIGWMQswCQYDVQQGEwJjbjESMBAGA1UEChMJQ0ZDQSBPQ0ExMRYwFAYD\r\nVQQLEw1Mb2NhbCBSQSBPQ0ExMRQwEgYDVQQLEwtFbnRlcnByaXNlczFFMEMGA1UE\r\nAww8MDQxQDgzMTAwMDAwMDAwODMwNDBA5Lit5Zu96ZO26IGU6IKh5Lu95pyJ6ZmQ\r\n5YWs5Y+4QDAwMDE2NDkzMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA\r\ntXclo3H4pB+Wi4wSd0DGwnyZWni7+22Tkk6lbXQErMNHPk84c8DnjT8CW8jIfv3z\r\nd5NBpvG3O3jQ/YHFlad39DdgUvqDd0WY8/C4Lf2xyo0+gQRZckMKEAId8Fl6/rPN\r\nHsbPRGNIZgE6AByvCRbriiFNFtuXzP4ogG7vilqBckGWfAYaJ5zJpaGlMBOW1Ti3\r\nMVjKg5x8t1/oFBkpFVsBnAeSGPJYrBn0irfnXDhOz7hcIWPbNDoq2bJ9VwbkKhJq\r\nVz7j7116pziUcLSFJasnWMnp8CrISj52cXzS/Y1kuaIMPP/1B0pcjVqMNJjowooD\r\nOxID3TZGfk5V7S++4FowVwIDAQABo4HoMIHlMB8GA1UdIwQYMBaAFNHb6YiC5d0a\r\nj0yqAIy+fPKrG/bZMEgGA1UdIARBMD8wPQYIYIEchu8qAQEwMTAvBggrBgEFBQcC\r\nARYjaHR0cDovL3d3dy5jZmNhLmNvbS5jbi91cy91cy0xNC5odG0wNwYDVR0fBDAw\r\nLjAsoCqgKIYmaHR0cDovL2NybC5jZmNhLmNvbS5jbi9SU0EvY3JsMjI3Mi5jcmww\r\nCwYDVR0PBAQDAgPoMB0GA1UdDgQWBBTEIzenf3VR6CZRS61ARrWMto0GODATBgNV\r\nHSUEDDAKBggrBgEFBQcDAjANBgkqhkiG9w0BAQUFAAOCAQEAHMgTi+4Y9g0yvsUA\r\np7MkdnPtWLS6XwL3IQuXoPInmBSbg2NP8jNhlq8tGL/WJXjycme/8BKu+Hht6lgN\r\nZhv9STnA59UFo9vxwSQy88bbyui5fKXVliZEiTUhjKM6SOod2Pnp5oWMVjLxujkk\r\nWKjSakPvV6N6H66xhJSCk+Ref59HuFZY4/LqyZysiMua4qyYfEfdKk5h27+z1MWy\r\nnadnxA5QexHHck9Y4ZyisbUubW7wTaaWFd+cZ3P/zmIUskE/dAG0/HEvmOR6CGlM\r\n55BFCVmJEufHtike3shu7lZGVm2adKNFFTqLoEFkfBO6Y/N6ViraBilcXjmWBJNE\r\nMFF/yA==\r\n-----END CERTIFICATE-----',
    * 	signature: 'hJdB17OMvw2XfwyprXtsaTR5A35q/FdAzvqy0sATK+aZTmHdqTQDe/buz8gAlXf4FGibgr/2aYusRXSkaLHd7GTHpkFkLsqgjWWKSQDr+o/SvLjN8YrgEr4VYv2SOM9yKDjdTlIn+E0BpbVAX1VeD+aeYolDJXbSbCdM3KiPSyW07ofHfDZREzl2AA6zyY6Nc1uheS/GhpwA51cLd5QOsEL0/B+PqQPxpXjHIeGZTTMt9R5j7FRjdX2qH+F8XFML0auAHNdRcjTCUnH1GSoNPbyGzhPcnzBqkhChX1adyMc4HtdAfH4jOdAV4Oji9cvTFuWzg7R88ugF8VOobgLzvQ=='
    * }
  */
  // const response = await unionPay.refunds({
  //   txnAmt: 1,
  //   orderId: (new Date()).getTime().toString(),
  //   backUrl: 'http://6a3fdecd.ngrok.yopoint.cc:81/unionpay/gateway/notify/5c3eeaeccb2e21b9b64f35e0',
  //   origQryId: '151901161705179895688',
  // });

  /** 退款回调
{
	"accessType": "0",
	"bizType": "000000",
	"currencyCode": "156",
	"encoding": "UTF-8",
	"merId": "898440353313553",
	"orderId": "1547632524375",
	"origQryId": "151901161705179895688",
	"queryId": "151901161755249910108",
	"respCode": "00",
	"respMsg": "成功[0000000]",
	"settleAmt": "1",
	"settleCurrencyCode": "156",
	"settleDate": "0116",
	"signMethod": "01",
	"signPubKeyCert": "-----BEGIN CERTIFICATE-----\r\nMIIEIDCCAwigAwIBAgIFEDRVM3AwDQYJKoZIhvcNAQEFBQAwITELMAkGA1UEBhMC\r\nQ04xEjAQBgNVBAoTCUNGQ0EgT0NBMTAeFw0xNTEwMjcwOTA2MjlaFw0yMDEwMjIw\r\nOTU4MjJaMIGWMQswCQYDVQQGEwJjbjESMBAGA1UEChMJQ0ZDQSBPQ0ExMRYwFAYD\r\nVQQLEw1Mb2NhbCBSQSBPQ0ExMRQwEgYDVQQLEwtFbnRlcnByaXNlczFFMEMGA1UE\r\nAww8MDQxQDgzMTAwMDAwMDAwODMwNDBA5Lit5Zu96ZO26IGU6IKh5Lu95pyJ6ZmQ\r\n5YWs5Y+4QDAwMDE2NDkzMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA\r\ntXclo3H4pB+Wi4wSd0DGwnyZWni7+22Tkk6lbXQErMNHPk84c8DnjT8CW8jIfv3z\r\nd5NBpvG3O3jQ/YHFlad39DdgUvqDd0WY8/C4Lf2xyo0+gQRZckMKEAId8Fl6/rPN\r\nHsbPRGNIZgE6AByvCRbriiFNFtuXzP4ogG7vilqBckGWfAYaJ5zJpaGlMBOW1Ti3\r\nMVjKg5x8t1/oFBkpFVsBnAeSGPJYrBn0irfnXDhOz7hcIWPbNDoq2bJ9VwbkKhJq\r\nVz7j7116pziUcLSFJasnWMnp8CrISj52cXzS/Y1kuaIMPP/1B0pcjVqMNJjowooD\r\nOxID3TZGfk5V7S++4FowVwIDAQABo4HoMIHlMB8GA1UdIwQYMBaAFNHb6YiC5d0a\r\nj0yqAIy+fPKrG/bZMEgGA1UdIARBMD8wPQYIYIEchu8qAQEwMTAvBggrBgEFBQcC\r\nARYjaHR0cDovL3d3dy5jZmNhLmNvbS5jbi91cy91cy0xNC5odG0wNwYDVR0fBDAw\r\nLjAsoCqgKIYmaHR0cDovL2NybC5jZmNhLmNvbS5jbi9SU0EvY3JsMjI3Mi5jcmww\r\nCwYDVR0PBAQDAgPoMB0GA1UdDgQWBBTEIzenf3VR6CZRS61ARrWMto0GODATBgNV\r\nHSUEDDAKBggrBgEFBQcDAjANBgkqhkiG9w0BAQUFAAOCAQEAHMgTi+4Y9g0yvsUA\r\np7MkdnPtWLS6XwL3IQuXoPInmBSbg2NP8jNhlq8tGL/WJXjycme/8BKu+Hht6lgN\r\nZhv9STnA59UFo9vxwSQy88bbyui5fKXVliZEiTUhjKM6SOod2Pnp5oWMVjLxujkk\r\nWKjSakPvV6N6H66xhJSCk+Ref59HuFZY4/LqyZysiMua4qyYfEfdKk5h27+z1MWy\r\nnadnxA5QexHHck9Y4ZyisbUubW7wTaaWFd+cZ3P/zmIUskE/dAG0/HEvmOR6CGlM\r\n55BFCVmJEufHtike3shu7lZGVm2adKNFFTqLoEFkfBO6Y/N6ViraBilcXjmWBJNE\r\nMFF/yA==\r\n-----END CERTIFICATE-----",
	"traceNo": "464074",
	"traceTime": "0116175524",
	"txnAmt": "1",
	"txnSubType": "00",
	"txnTime": "20190116175524",
	"txnType": "04",
	"version": "5.1.0",
	"signature": "dewRNymSV8xSidMrY2/q0wuQpvmkSZIWhD1C4HXQYPyg6bDzCAiAKFlacEY7IR9fw3mnNU+W5opO6SwZ59fsiOWovbwpiFhNQmPdNImA+5gk6swWNW2KsHdkcWvG5WMIYscTF7beC0Dk2AfmyrqNxCptfC2H1xWuId57KD50j6PbXkEpxP/O+P+rsbfIFjB8mcEospyeI6cBjGnN3n1WCxD/FhIu7mpx2rSt1E+nbCOMu4x7kFFGtc+CAJtIJLhfn3k8Y9MpTV3stS1bfotxocjwh6xt9jqS1VCbEigV8byI7SD1ffG7xQEyG69ix2hpthgOVKKateTujXvSoj/E0A=="
}
  */
})();