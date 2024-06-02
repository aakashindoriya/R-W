const express = require('express');
const { getCart,addToCart,changeQuantity,deleteItem } = require('../controllers/cart.controller');
const Auth=require("../middlewares/auth.middleware")
const router = express.Router();
router.get("/",Auth ,getCart)
router.post("/",Auth,addToCart)
router.put("/",Auth,changeQuantity)
router.delete("/:id",Auth,deleteItem)

module.exports = router;