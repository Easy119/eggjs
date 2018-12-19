const Service  = require("egg").Service;
const {ERROR,SUCCESS} = require("../util/util")
const md5 = require('js-md5')
class userService extends Service {
    async reg(opts){
        const ctx = this.ctx;
        try {
            const queryResult =await this.ctx.model.User.findAll({
                where:{
                    username:opts.username
                }
            })
            if (queryResult.length > 0) {
                return Object.assign(ERROR, {
                    msg: '用户已存在',
                });
              } else {
                await this.ctx.model.User.create(Object.assign(opts,{
                    userpass:md5(opts.userpass) 
                }));
                return Object.assign(SUCCESS, {
                    msg: '注册成功',
                })
              }
        } catch (err){
            this.ctx.status = 500;
            throw (err);
        }
      
    }
    async Login (opts){
        try {
            const {username,userpass} = opts;
            if(!username || !userpass){
                this.ctx.status = 400;
                return Object.assign(ERROR, {
                  code:"3",
                  msg: "个人信息数据不全",
                }); 
            }
            const queryResult = await this.ctx.model.User.findOne({
                where:{
                    username:username.toString()
                }
            })
            if(!queryResult){
                return  Object.assign(ERROR, {
                    code : "2",
                    msg: '用户不存在,请先注册'
                });
            }else{
                console.log(md5(userpass) )
                if(queryResult.userpass == md5(userpass) ){
                    return  Object.assign(ERROR, {
                        msg: '登录成功'
                    });
                }else{
                    return  Object.assign(ERROR, {
                        code : "1",
                        msg: '登录失败，账号或者密码错误'
                    });
                }

            }
        }catch(err){
            this.ctx.status = 500;
            throw (err);
        }
    }
}
module.exports = userService