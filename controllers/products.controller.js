require("dotenv").config()


const ProductsService = require('../services/productServices');
const productsServiceInstance = new ProductsService();

async function getProductInfo(req, res) {
    try {
        const data = req.query.data;

        // Verificar si data es un número (código de barras) utilizando una expresión regular
        const isBarcode = /^\d+$/.test(data);

        let products;

        // Llamar al método correspondiente basado en si es un código de barras o un nombre de producto
        if (isBarcode) {
            products = await productsServiceInstance.getProductByBarcode(data);
        } else {
            const name = data.toUpperCase();
            products = await productsServiceInstance.getProductByName(name);
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getProductInfoByDatabaseId(req, res) {
    try {
        const id = req.query.productId;
        const product = await productsServiceInstance.getProductById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateProductByDatabaseId(req, res) {
    try {
        const id = req.query.productId;
        const product = req.body;
        const updatedProduct = await productsServiceInstance.updateProduct(id, product);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function addNewProduct(req, res){
    try {
        const product = req.body;
        product.name = product.name.toUpperCase();
        const newProduct = await productsServiceInstance.createProduct(product.name,product.barcode,product.costPrice,product.publicPrice)
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getProductInfo,
    getProductInfoByDatabaseId,
    updateProductByDatabaseId,
    addNewProduct
}