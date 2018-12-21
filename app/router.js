'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/invoiceList', controller.invoice.getList);
  router.get('/invoiceAddress', controller.invoice.addressList);
  router.post('/reg', controller.user.reg);
  router.post('/login', controller.user.login);
  
};
