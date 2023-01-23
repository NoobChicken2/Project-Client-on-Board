import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from "express";

export let secret = 'ClientOnBoardSecret';
import servers from './serverCredentials';

export function compareLoginDetails (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string }): void; new(): any; }; }; json(param: { error: string }): void; }, next: any) {
    let username = req.body.username;
    let password = req.body.password;

    function exists(server: { username: string; password: string}) {
        return server.username == username;
    }

    if (servers.find(exists) == null) {
        res.status(404).json({error: 'Server username does not exist, please check again!'});
        return;
    }

    let server = servers.find(exists);

    // @ts-ignore. Ignoring compile error that says server is possibly undefined - condition is guaranteed as check is done above
    bcrypt.compare(password, server.password, (err, result) => {
        if (err) {
            return res.status(500).json({error: 'An error occurred while comparing passwords'});
        }
        if (result) {
            return next();
        } else {
            return res.status(401).json({error: 'The password does not match!'});
        }
    });
}

export function tokenBodyDetails (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; }, next: () => any) {
    if(!('username' in req.body && 'password' in req.body)) {
        return res.status(400).json({error: 'The requested body does not have the required parameters'});
    }

    return next();
}

export function isLoggedIn (req: { get: (arg0: string) => any; token: string; user: (jwt.Jwt & jwt.JwtPayload & (string | jwt.JwtPayload)) | null; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; }, next: () => any) {
    let token = req.get('Authorization');
    //console.log(token)
    token = token.split(' ');
    //console.log(token[1])

    // @ts-ignore
    jwt.verify(token[1], secret, {algorithm: 'HS256'}, (err) => {
        if (err) {
            return res.status(401).json({error: err})
        } else {
            // @ts-ignore
            req.user = jwt.decode(token[1], secret);
            return next();
        }
    });
}