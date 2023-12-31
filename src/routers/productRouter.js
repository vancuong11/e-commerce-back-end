import express from 'express';
import { verifyAccessToken, verifyIsAdmin } from '../middlewares/verifyToken';
import productController from '../components/productController';
import uploader from '../config/configcloudinary';
const router = express.Router();

router.post('/create-product', verifyAccessToken, verifyIsAdmin, productController.createProduct);
router.get('/get-details/:id', productController.getDetailsProduct);
router.delete('/delete-product/:id', verifyAccessToken, verifyIsAdmin, productController.deleteProduct);
router.put('/update-product/:id', verifyAccessToken, verifyIsAdmin, productController.updateProduct);
router.put('/ratings', verifyAccessToken, productController.ratingsProduct);
router.get('/get-all', productController.getAllProduct);
router.put(
    '/upload-image-product/:id',
    verifyAccessToken,
    verifyIsAdmin,
    uploader.array('images', 10),
    productController.uploadImagesProduct,
);

module.exports = router;
