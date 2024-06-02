const Product = require('../models/product.model');


exports.getAllProducts = async (req, res) => {
    const { search, page = 1 } = req.query;
    const limit = 20;
    const skip = (page - 1) * limit;

    try {
        const query = search ? { name: { $regex: search, $options: 'i' } } : {};

        const products = await Product.find(query)
            .skip(skip)
            .limit(limit);

        const total = await Product.countDocuments(query);

        res.status(200).send({
            products,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit)
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.createProducts=async(req,res)=>{
    try {
        const products=await Product.create({...req.body})
        res.status(201).send("product created")
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}