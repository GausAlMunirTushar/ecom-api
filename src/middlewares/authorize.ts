import { Request, Response, NextFunction } from 'express';

const authorize = async (req: Request, res: Response, next: NextFunction) => {
	if (res.locals.role !== 'admin') {
		return res
			.status(403)
			.json({ status: 'Failed', message: 'Unauthorized' });
	}
	if (res.locals.role === 'admin') {
		next();
	}
};

export default authorize;
