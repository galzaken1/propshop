import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js';


// @desc Fetching all products
// @route /api/products
// @access public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    console.log('lkdsadklsa')
    res.json(products)

})
// @desc Fetching a single product by ID
// @route /api/products/productId
// @req.params.productId = productId // obsly
// @access public
const getProductById = asyncHandler(async (req, res, next) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (product) {
        return res.json(product)
    } else {
        res.status(404);
        throw new Error('Resource not found')
    }

})
export { getProducts, getProductById };