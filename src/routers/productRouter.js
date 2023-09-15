import express from 'express';
import { verifyAccessToken, verifyIsAdmin } from '../middlewares/verifyToken';
import productController from '../components/productController';
const router = express.Router();

router.post('/create-product', verifyAccessToken, verifyIsAdmin, productController.createProduct);
router.get('/get-details/:id', productController.getDetailsProduct);
router.delete('/delete-product/:id', verifyAccessToken, verifyIsAdmin, productController.deleteProduct);
router.put('/update-product/:id', verifyAccessToken, verifyIsAdmin, productController.updateProduct);
router.put('/ratings', verifyAccessToken, productController.ratingsProduct);
router.get('/get-all', productController.getAllProduct);
module.exports = router;
