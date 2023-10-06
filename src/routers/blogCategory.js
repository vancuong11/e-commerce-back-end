import express from 'express';
import { verifyAccessToken, verifyIsAdmin } from '../middlewares/verifyToken';
import blogCategoryController from '../components/blogCategoryController';
const router = express.Router();

router.post('/create-blog-category', verifyAccessToken, verifyIsAdmin, blogCategoryController.createBlogCategory);
router.get('/get-blog-category', blogCategoryController.getBlogCategory);
router.put('/update-blog-category/:id', verifyAccessToken, verifyIsAdmin, blogCategoryController.updateBlogCategory);
router.delete('/delete-blog-category/:id', verifyAccessToken, verifyIsAdmin, blogCategoryController.deleteBlogCategory);

module.exports = router;
