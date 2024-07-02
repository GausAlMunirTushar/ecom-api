import { Router } from 'express';
import { createProduct, getProducts } from '../controllers/productController';
import authVerify from '../middlewares/authVerify';
import authorize from '../middlewares/authorize';
import { upload } from '../middlewares/multer.middleware';
const router = Router();

router.get('/', getProducts);
router.post('/', [authVerify, authorize], upload, createProduct);

export { router as productRoutes };
