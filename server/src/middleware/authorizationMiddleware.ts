import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database/databaseConnection';
import express, {NextFunction} from "express";

export let secret = 'ClientOnBoardSecret';

export function compareLoginDetails (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string }): void; new(): any; }; }; json(param: { error: string }): void; }, next: any) {
    let isUsernameFound = false;
    pool.query(`SELECT * FROM users`,(err:any,result: { rows:any;})  => {
        if (err){
            return res.json({error:"Token issue"});
        }
        //Loops through all the users and checks if the username and the password match
        result.rows.forEach((item: {
            user_id:number; role: string; password: string; username: string; }) => {
            if (item.username === req.body.username) {
                isUsernameFound = true;
                bcrypt.compare(req.body.password, item.password, (err, result) => {
                    if (err) {
                        return res.status(500).json({error: 'An error occurred while comparing passwords'});
                    }
                    if (result) {
                        return next();
                    } else {
                        return res.status(404).json({error: 'The password does not match!'});
                    }
                });
                req.role = item.role;
                req.user_id = item.user_id;
            }
        });
        //If the username has not been found it will return a 404 error
        if (!isUsernameFound) {
            return res.status(404).json({error: 'The username does not match!'});
        }
    });
}

export function tokenBodyDetails (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; }, next: () => any) {
    if(!('username' in req.body && 'password' in req.body)) {
        return res.status(400).json({error: 'The requested body does not have the required parameters'});
    }

    return next();
}

export function isLoggedIn (req:any,res:any,next:NextFunction) {
    let token = req.get('Authorization');
    console.log(token)
    token = token.split(' ');
    console.log(token[1])



    // @ts-ignore
    jwt.verify(token[1], secret, {algorithm: 'HS256'}, (err:any) => {
        if (err) {
            return res.status(401).json({error: err})
        } else {
            // @ts-ignore
            req.user = jwt.decode(token[1], secret);
            return next();
        }
    });
}

export function roleScanner (req:express.Request,resp:express.Response,next:express.NextFunction){
    let token = req.get('Authorization');
    // @ts-ignore
    let to = token.split('Bearer');



    // @ts-ignore
    jwt.verify(token[1], secret, {algorithm: 'HS256'}, (err) => {
        if (err) {
            return resp.status(401).json({error: err})
        } else {
            // @ts-ignore
            req.user = jwt.decode(req.token, secret);
            return next();
        }
    });


}
