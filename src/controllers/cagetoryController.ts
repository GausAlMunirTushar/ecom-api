import { Request, Response } from 'express';
import { Category } from '../models';

const createCategory = async (req: Request, res: Response) => {
try {
    const { name, description } = req.body;
    let category = await Category.findOne({ name });
    if (category) {
        return res
            .status(400)
            .json({ status: 'Failed', message: 'Category already exists' });
    }
    const newCategory = await Category.create({ name, description });
    return res.status(201).json({
        status: 'Success',
        message: 'Category created',
        data: newCategory,
    });
} catch (err: any) {
		return res.status(500).json({ status: 'Failed', message: err.message });
	}
};

const getCategory = async (_req: Request, res: Response) => {
    try {
        const categories = await Category.find({}).select('name description').sort({name: 1});
        return res.status(200).json({
            status: 'Success',
            message: 'List of categories',
            data: categories,
        });
    } catch (err: any) {
        return res.status(500).json({ status: 'Failed', message: err.message });
    }
};

export { createCategory, getCategory };
