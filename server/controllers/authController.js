import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { errorResponse } from '../utils/responseHandler.js';

export const login = async (req, res) => {
    const {email, password} = req.body;
    
    if (!email || !password) {
        return errorResponse(res, 400, 'Email and password are required');
    }
    
    try {
        const adminInfo = await User.findOne({email});
        
        if (!adminInfo) {
            return errorResponse(res, 401, 'Invalid credentials');
        }
        
        if (adminInfo.isLocked) {
            return errorResponse(res, 403, 'Account locked. Please try again later.');
        }
        
        const isValid = await adminInfo.verifyPassword(password);
        if (!isValid) {
            await adminInfo.incrementLoginAttempts();
            return errorResponse(res, 401, 'Invalid credentials');
        }
        
        await adminInfo.resetLoginAttempts();
        const payload = {
            id: adminInfo._id,
        };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
        
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000 // 1 hour
        });
        
        return res.status(200).json({
            success: true,
            message: 'Login Successful',
            admin: {
                email: adminInfo.email,
                firstName: adminInfo.firstName,
                lastName: adminInfo.lastName,
                role: adminInfo.role
            }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        return errorResponse(res, 500, 'Internal server error');
    }
};