import express from 'express';
import pool from "../database/databaseConnection";
import {isLoggedIn} from "../middleware/authorizationMiddleware";
const router = express.Router();




router.get('/',isLoggedIn, async (req:any, res:any) => {
    if (req.user.role === 'GlobalAdmin' || req.user.role === 'CompanyAdmin'){
        pool.query('SELECT * FROM tickets INNER JOIN logs ON tickets.log_id = logs.log_id', (error: any, results: { rows: any; }) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
    } else {
        return res.status(401).json({error:"Unauthorized Access"})
    }
    
});

// @ts-ignore
router.get('/:id',isLoggedIn, async (req, res) => {
    let id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({error:"Bad ID format!"});
    }
    // @ts-ignore
    if (req.user.role === 'GlobalAdmin' || req.user.role === 'CompanyAdmin'){
        pool.query(`SELECT *
                FROM tickets
                         INNER JOIN logs ON tickets.log_id = logs.log_id
                WHERE ticket_id = ${id}`, (error: any, results: { rows: any; }) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
    } else {
        return res.status(401).json({error:"Unauthorized Access"})
    }

});

// @ts-ignore
router.post('/', isLoggedIn,async (req, res) => {
    let id = Number(req.body.log_id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({error:"log_id must be an integer!"});
    }
    try {
        let {rows} = await pool.query(`SELECT *
                FROM tickets
                WHERE log_id = ${id}`)

        if (rows.length > 0) {
            return res.status(400).json({error:"A ticket for this log is already existed!"});
        }
    } catch (e) {

    }
    pool.query(`INSERT INTO tickets (log_id)
                VALUES (${id})`, (error: any, results: { rows: any; }) => {
        if (error) {
            return res.status(500).json(error)
        }
        res.status(200).json(results.rows)
    })

});

// @ts-ignore
router.delete('/:id',isLoggedIn, async (req, res) => {
    let id = Number(req.body.log_id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({error:"Id must be an integer!"});
    }
    // @ts-ignore
    if (req.user.role === 'CompanyAdmin' || req.user.role === 'GlobalAdmin'){
        pool.query(`DELETE
                FROM tickets
                WHERE ticket_id = ${id}`, (error: any, results: { rows: any; }) => {
            if (error) {
                return res.status(500).json(error)
            }
            res.status(200).json(results.rows)
        })
    } else {
        return res.status(401).json({error:"Unauthorized Access"})
    }


});

export default router;