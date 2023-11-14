import express from 'express';
import { verifyAccessToken, verifyIsAdmin } from '../middlewares/verifyToken';
import blogController from '../components/blogController';
import uploader from '../config/configcloudinary';
const router = express.Router();

router.post('/create-blog', verifyAccessToken, verifyIsAdmin, blogController.createBlog);
router.get('/get-blog', blogController.getAllBlog);
router.get('/get-blog-detail/:bid', blogController.getBlogDetail);
router.put('/update-blog/:id', verifyAccessToken, verifyIsAdmin, blogController.updateBlog);
router.put('/like/:bid', verifyAccessToken, blogController.likeBlog);
router.put('/dislike/:bid', verifyAccessToken, blogController.disLikeBlog);
router.delete('/delete-blog/:id', verifyAccessToken, verifyIsAdmin, blogController.deleteBlog);

router.put(
    '/upload-image-blog/:id',
    verifyAccessToken,
    verifyIsAdmin,
    uploader.single('image'),
    blogController.uploadImagesBlog,
);
module.exports = router;
