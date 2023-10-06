import express from 'express';
import { verifyAccessToken, verifyIsAdmin } from '../middlewares/verifyToken';
import productCategoryController from '../components/productCategoryController';
const router = express.Router();

router.post('/create-category', verifyAccessToken, verifyIsAdmin, productCategoryController.createCategory);
router.get('/get-category', productCategoryController.getCategory);
router.put('/update-category/:id', verifyAccessToken, verifyIsAdmin, productCategoryController.updateCategory);
router.delete('/delete-category/:id', verifyAccessToken, verifyIsAdmin, productCategoryController.deleteCategory);

module.exports = router;
