const express = require('express');
const { getAllProducts, createProducts } = require('../controllers/product.controller');

const router = express.Router();

router.get("/",getAllProducts)
router.post("/",createProducts)
module.exports = router;