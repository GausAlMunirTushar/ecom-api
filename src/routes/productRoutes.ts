import { Router } from 'express';
import { createProduct, getProducts } from '../controllers/productController';
import authVerify from '../middlewares/authVerify';
import authorize from '../middlewares/authorize';

const router = Router();

router.get('/', getProducts);
router.post('/', [authVerify, authorize], createProduct);

export { router as productRoutes };
