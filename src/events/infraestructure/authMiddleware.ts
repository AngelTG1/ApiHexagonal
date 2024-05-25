import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

interface AuthResquest extends Request {
    userId?: string;
}

export const authnticateJWT = (req: AuthResquest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?('auth-token').split(' ')[2]:null;
    if (!token) {
        return res.status(401).send({
            status: "error",
            message: "No Token"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.userId = (decoded as any).userId;
        next();
    } catch (error) {
        console.error("Error in Auth Middleware", error);
        return res.status(401).send({
            status: "error",
            message: "Invalid Token"
        });
    }

}