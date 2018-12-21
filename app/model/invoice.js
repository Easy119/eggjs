'use strict';
module.exports = app =>{
    const { STRING , INTEGER} = app.Sequelize;
    const Invoice = app.model.define("invoice",
    {
        id:{type: INTEGER, primaryKey: true, autoIncrement : true},
        orderNumber : STRING(32),
        username : STRING(32),
        phone : STRING(32),
        company : STRING(32),
        taxNum : STRING(32),
        bankInfo : STRING(32),
        invoiceType : STRING(32),
        invoicePost : STRING(32),
        address : STRING(32),
        timeStamp: STRING(32),
        is_down : STRING(32),
        is_open_invoice : STRING(32),
        is_check : STRING(32)
    },
    {
        freezeTableName : true, // Model 对应的表名将于model名字相同
        timestamps: false
    })
    return Invoice
}
