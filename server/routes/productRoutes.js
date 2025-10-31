const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/product', productController.createProducts);
router.get('/product', productController.getAllProducts);
router.put('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

module.exports = router;