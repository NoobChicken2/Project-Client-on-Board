import express from 'express';
const router = express.Router();

import {compareLoginDetails, tokenBodyDetails, secret} from '../middleware/authorizationMiddleware';
import jwt from 'jsonwebtoken';

// @ts-ignore
router.post("/", tokenBodyDetails, compareLoginDetails, (req, res) => {
    let payload = {
        // @ts-ignore
        company_id:req.company_id,
        // @ts-ignore
        user_id: req.user_id,
        username: req.body.username,
        date: new Date(),
    };

    jwt.sign(payload, secret, {algorithm: 'HS256'}, (err, result) => {
        if (err) {
            return res.status(500).json({error: 'Something went wrong with the token'})
        }
        // @ts-ignore
        return res.status(200).json({token: result});
    });

});

export default router;