const Controller = require("egg").Controller;

class InvoiceController extends Controller {
    async getList(){
        const ctx =  this.ctx;
        const result = await this.service.invoice.list();
        ctx.body = result;
    };
    async addressList(){
        const ctx =  this.ctx;
        const result = await this.service.invoice.addressList();
        ctx.body = result;
    }
}
module.exports = InvoiceController