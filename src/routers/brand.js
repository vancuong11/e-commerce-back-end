import express from 'express';
import { verifyAccessToken, verifyIsAdmin } from '../middlewares/verifyToken';
import brandController from '../components/brandController';
const router = express.Router();

router.post('/create-brand', verifyAccessToken, verifyIsAdmin, brandController.createBrand);
router.get('/get-brand', brandController.getBrand);
router.put('/update-brand/:id', verifyAccessToken, verifyIsAdmin, brandController.updateBrand);
router.delete('/delete-brand/:id', verifyAccessToken, verifyIsAdmin, brandController.deleteBrand);

module.exports = router;
