import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authVerify = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization;
	if (!token) {
		return res
			.status(401)
			.json({ status: 'Failed', message: 'Unauthorized' });
	}
	try {
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret
        );
        res.locals = decodedToken as any;
        next();
    } catch (error) {
        return res.status(400).json({ status: 'Failed', message: 'Invalid token' });
    }
};

export default authVerify;