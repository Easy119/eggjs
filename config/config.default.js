'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545194794016_169';

  // add your config here
  config.middleware = [];
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'egg_demo',
    username: 'root',
    password: '123456a'
  }  
  config.view = {
    mapping: {
      '.ejs': 'ejs'
    }
  }
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
    domainWhiteList: [ 'http://127.0.0.1:7001' ],
  };


  return config;
};
