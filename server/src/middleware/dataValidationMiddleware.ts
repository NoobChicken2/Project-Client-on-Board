import {Request,NextFunction, Response} from "express";

export function validateUserPatch(req:Request,res:Response,next:NextFunction){
    let body = req.body;
    if (body.user_id != null || body.company_id != null || body.role != null) {
        return res.status(400).json({error:"Cannot change ID "});
    }

    if (body.username != null && body.username.length > 25) {
        return res.status(400).json({error:"Bad username: too long (max. 25 characters)!"});
    }

    if (body.first_name != null && body.first_name.length > 25) {
        return res.status(400).json({error:"First name is too long!"});
    }

    if (body.last_name != null && body.last_name.length > 25) {
        return res.status(400).json({error:"Last name is too long!"});
    }

    if (body.email != null && body.email.length > 30) {
        return res.status(400).json({error:"Email is too long!"});
    }

    if (body.phone_number != null && body.phone_number.length > 15) {
        return res.status(400).json({error:"Phone number too long!"});
    }
    return next()
}
export function validateUser(req:Request,res:Response,next:NextFunction){
    let body = req.body;
    if (body.user_id != null) {
        return res.status(400).json({error:"Cannot change ID "});
    }

    if (body.username != null && body.username.length > 25) {
        return res.status(400).json({error:"Bad username: too long (max. 25 characters)!"});
    }

    if (body.first_name != null && body.first_name.length > 25) {
        return res.status(400).json({error:"First name is too long!"});
    }

    if (body.last_name != null && body.last_name.length > 25) {
        return res.status(400).json({error:"Last name is too long!"});
    }

    if (body.email != null && body.email.length > 30) {
        return res.status(400).json({error:"Email is too long!"});
    }

    if (body.phone_number != null && body.phone_number.length > 15) {
        return res.status(400).json({error:"Phone number too long!"});
    }
    return next()
}
