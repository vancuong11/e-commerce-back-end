import express from 'express';
import insertData from '../components/insertData';
const router = express.Router();

router.post('/', insertData.insertProduct);
router.post('/cate', insertData.insertCategory);

module.exports = router;
