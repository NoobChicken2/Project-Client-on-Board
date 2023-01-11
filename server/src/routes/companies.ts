import express from 'express';
import pool from "../database/databaseConnection";
import {isLoggedIn} from "../middleware/authorizationMiddleware";

const router = express.Router();

// @ts-ignore
router.get('/',isLoggedIn, async (req, res) => {
    // @ts-ignore
    if ( req.user.role === 'GlobalAdmin'){
        pool.query(`SELECT *
                FROM companies`, (error: any, results: { rows: any }) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
    } else {
        res.status(401).json({error:"Unauthorized access"})
    }

});
// @ts-ignore
router.get('/:id',isLoggedIn, async (req, res) => {
    // @ts-ignore
    if ( req.user.role === 'GlobalAdmin'){
        let id = req.params.id;
        pool.query(`SELECT *
                FROM companies
                WHERE company_id = ${id}`, (err: any, results: { rows: any; }) => {
            if (err) {
                res.json({error: "Server side issue(GET)"})
            }
            res.status(200).json(results.rows);
        })
    }
});
// @ts-ignore
router.post('/',isLoggedIn, async (req, res) => {
    // @ts-ignore
    if ( req.user.role === 'GlobalAdmin'){
        let company_name = req.body.company_name;

        pool.query(`INSERT INTO companies (company_name)
                VALUES ($1)`, [company_name], (err: any, result: { rows: any; }) => {
            if (err) {
                return res.status(400).json({error: "Server side issue (POST)"})
            }
            return res.status(201).json(req.body);
        })
    }

});
// @ts-ignore
router.patch('/:id',isLoggedIn, async (req, res) => {
    // @ts-ignore
    if ( req.user.role === 'GlobalAdmin'){
        const id = req.params.id;
        const updates = req.body;

        const updatesString = Object.entries(updates)
            .map(([key, value]) => `${key}='${value}'`)
            .join(', ');


        pool.query(`UPDATE companies
                SET ${updatesString}
                WHERE company_id = ${id} `, (error: any, results: any) => {
            if (error) {
                res.status(500).json({error});
            }
            res.status(200).json(results);
        });
    }
});
// @ts-ignore
router.delete('/:id',isLoggedIn, async (req, resp) => {
    // @ts-ignore
    if ( req.user.role === 'GlobalAdmin'){
        let company_id = req.params.id;
        pool.query(`DELETE
                FROM companies
                WHERE company_id = ${company_id}`, (err, result: { rows: any; }) => {
            if (err) {
                return resp.status(400).json({error: "Issue on the server side (DELETE)"})
            }
            return resp.status(200);
        })
    }
})

export default router;