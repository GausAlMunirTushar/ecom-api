import { Request, Response } from 'express';

import { Product } from '../models';
import { pick } from 'lodash';

const getProducts = async (req: Request, res: Response) => {
	try {
		const { params } = req;
		const page = Number(params?.page) || 1;
		const limit = Number(params?.per_page) || 20;
		const skip = (page - 1) * limit;

		const products = await Product.find()
			.skip(skip)
			.limit(limit)
			.populate('category');
		return res.status(200).json({
			status: 'success',
			message: 'Products list',
			data: products,
		});
	} catch (err: any) {
		return res.status(500).json({ message: err.message });
	}
};
const createProduct = async (req: Request, res: Response) => {
	const payload = pick(req.body, [
		'name',
		'price',
		'description',
		'stock',
		'category',
	]);
	try {
		const product = await Product.create(payload);
		return res.status(201).json({
			status: 'success',
			message: 'Product created successfully',
			data: product,
		});
	} catch (err: any) {
		return res.status(500).json({ message: err.message });
	}
};

const updateProduct = async (req: Request, res: Response) => {};

export { createProduct, getProducts };
