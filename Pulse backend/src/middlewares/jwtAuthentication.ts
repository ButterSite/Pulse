import jwt  from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';

import type { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId?: string;
    username?: string;
  } | JwtPayload | string;
}

export const verifyToken = (req: AuthenticatedRequest ,res: Response, next: NextFunction) => {
    try {
        const secretToken = process.env.JWT_SECRET_TOKEN || `secretKey123`
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            res.status(401).json({success: false, message: `Token not provided`});
            return;
        }
        const token: string = authHeader.split(` `)[1];


        const decodedToken = jwt.verify(token, secretToken);
        req.user = decodedToken;
        next();
    }catch(error) {
        res.status(403).json({success: false, message: `Wrong token`});
        throw error
    }



}