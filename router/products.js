require("dotenv").config()

const express = require('express')
const router = express.Router();

const {getProductInfo, getProductInfoByDatabaseId, updateProductByDatabaseId, addNewProduct} = require('../controllers/products.controller');

router.get('/getProductInfo', getProductInfo);
router.get('/getProductInfoByDatabaseId', getProductInfoByDatabaseId);
router.put('/updateProduct', updateProductByDatabaseId);
router.post('/addNewProduct', addNewProduct);

module.exports = router;