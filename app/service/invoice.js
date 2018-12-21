const Service = require("egg").Service;
const {SUCCESS, ERROR} = require("../util/util")
class InvoiceService extends Service {
    async list(){
        const ctx = this.ctx;
        try{
            const result = await ctx.model.Invoice.findAll();
            return Object.assign(SUCCESS,{
                msg:result
            }) 
        }catch(err){
            ctx.status = 500 ;
            throw(err)
        }
    };
    async addressList() {
        const ctx = this.ctx;
        try {
            const addressName = await ctx.model.Invoice.findAll({
                attributes:["address"]
            })
            let addressArray = [];
            for(let item of addressName){
                 let encodeUrl = encodeURI(`http://api.map.baidu.com/geocoder/v2/?address=${item.address}&output=json&ak=f0adK3ngpBhPqFVU3QLq4xzBG1nveMLa`) 
                 const addressResult = await ctx.curl(encodeUrl,{dataType:"json"});
                 let latitudeResult = addressResult.data.result.location;
                 addressArray.push(Object.assign(latitudeResult,{
                    streetName:item.address
                 }))
            }
            return Object.assign(SUCCESS,{
                list:addressArray
            })
        } catch (err){
            ctx.status = 500 ;
            throw(err)
        }
    }
}
module.exports = InvoiceService