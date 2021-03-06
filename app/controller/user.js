'use strict';
 
const Controller = require('egg').Controller;
const {ERROR} = require("../util/util")
class UserController extends Controller {
    async reg() {
        const ctx = this.ctx;
        const rule = {
            username: { type: 'string', required: true, message: '必填项' },
            userpass: { type: 'string', required: true, message: '必填项' },
            sex: { type: 'string', required: false, message: '必填项' }
        };
        try {
            const regMsg = ctx.request.body;
            const {username,userpass,sex} = regMsg;
            // 添加校验
            await ctx.validate(rule,regMsg);
            const result = await this.ctx.service.user.reg({username,sex,userpass});
            this.ctx.body = result;
        }catch(err){
            this.ctx.status = 200;
            this.ctx.body = Object.assign(ERROR,{
                code :"1",
                msg : "上传数据不全"
            });
            // throw (err);
        }
    };
    async login() {
        const ctx = this.ctx;
        const rule = {
            username: { type: 'string', required: true, message: '必填项' },
            userpass: { type: 'string', required: true, message: '必填项' },
        };
        try {
            await ctx.validate(rule);
            const {username,userpass} = ctx.request.body;
            const result = await ctx.service.user.Login({username,userpass});
            ctx.body = result;
        }catch(err){
            ctx.status = 500;
            throw(err)
        }
    }
}
 
module.exports = UserController;
