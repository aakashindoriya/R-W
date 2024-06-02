const Cart =require("../models/cart.model")
exports.getCart=async(req,res)=>{
    try {
        const id = req.user.id;
        const cart = await Cart.find({ userId: id ,status:false}).populate('productId')
        res.status(200).send({ data: cart });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

}


exports.changeQuantity=async(req,res)=>{
    try {
        const id = req.user.id;
        const cart = await Cart.findOneAndUpdate({ userId: id, _id: req.query.id }, req.body, { new: true }).populate('productId');
        res.status(200).send({ data: cart });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

}

exports.addToCart=async(req,res)=>{
    try{
       const id = req.user.id;
    let cartItem = await Cart.findOne({ userId: id, productId: req.body.productId });
     if (cartItem) {
        
        cartItem.quantity = cartItem.quantity + req.body.quantity;
        cartItem = await cartItem.save().then(() => { return cartItem.populate('productId')});
        return res.status(201).send(cartItem)
    }
    else {
        const cart = new Cart(req.body);
        cart.userId = id;
        cartItem = await cart.save().then(() => { return cart.populate('productId')});
    res.status(200).send({ message: "Cart updated successfully" ,cartItem});
    }
   }catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
   }

}

exports.deleteItem=async(req,res)=>{
    try {
        console.log(req.params.id)
        let result=await Cart.findOne({_id:req.params.id})
        let response=await Cart.deleteOne({_id:req.params.id});

        console.log(response,result)
        res.status(200).send({ message: "Item deleted from cart successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

}