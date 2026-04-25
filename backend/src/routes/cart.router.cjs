const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeCartItem, clearCart } = require('../controllers/cart.controller.cjs');

router.post('/', addToCart);
router.get('/:userId', getCart);
router.patch('/:id', updateCartItem);
router.delete('/:id', removeCartItem);
router.delete('/user/:userId', clearCart);

console.log("Cart router working");

module.exports = router;