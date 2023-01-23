import express from 'express';
const router = express.Router();

import {compareLoginDetails, tokenBodyDetails, secret} from './authorizationMiddleware';
import jwt from 'jsonwebtoken';

// to parse JSON from request body - body-parser is DEPRECATED
router.use(express.urlencoded({extended: true}));
router.use(express.json());

// @ts-ignore

router.post("/", tokenBodyDetails, compareLoginDetails, (req, res) => {

    let payload = {
        // @ts-ignore
        username: req.body.username,
        date: new Date(),
        // @ts-ignore
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