import { Router, Request, Response } from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, modifyProduct } from '../controllers/productControllers';

const productRouter: Router = Router();

productRouter.get('/', getAllProducts);

productRouter.get('/:id', getProductById);

productRouter.post('/', createProduct);

productRouter.delete('/', deleteProduct);

productRouter.patch('/:id', modifyProduct);

export default productRouter;