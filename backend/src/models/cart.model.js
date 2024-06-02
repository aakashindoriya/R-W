const mongoose = require("mongoose")

let cartSchema=new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default:1 },
    status:{
        type:Boolean,default:false
    }
})

let Cart =mongoose.model("CartItem",cartSchema)

module.exports=Cart