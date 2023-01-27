import {isLoggedIn} from "../middleware/authorizationMiddleware";
import pool from "../database/databaseConnection";
import express from "express";
const router = express.Router();
router.get('/',isLoggedIn, (req:any, res:any) => {
    if ( req.user.role === 'GlobalAdmin'){
        pool.query(`SELECT * FROM users`, (err: any, result: { rows: any; }) => {
            if (err) {
                throw err
            }
            res.status(200).json(result.rows);
        })

    }
});
export default router;