import express from 'express';
import pool from "../database/databaseConnection";
import {isLoggedIn} from "../middleware/authorizationMiddleware";
import error from "svelte/types/compiler/utils/error";
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

router.get('/:id',isLoggedIn, async (req:any, res:any) => {
    let id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({error:"Bad ID format!"});
    }
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

router.get('/users/:userId', isLoggedIn, async (req, res) => {
    let userId = Number(req.params.userId);
    if (isNaN(userId)) {
        return res.status(400).json({error:"Bad ID format!"});
    }
    // @ts-ignore
    switch (req.user.role) {
        case "Client" :
            pool.query(`SELECT tickets.*, logs.converter_id, logs.log_event
                FROM tickets
                    INNER JOIN logs ON tickets.log_id = logs.log_id
                    INNER JOIN converters ON logs.converter_id = converters.converter_id
                    INNER JOIN users ON converters.owner_id = users.user_id
                WHERE users.user_id = $1`, [userId], (error: any, results: { rows: any; }) => {
                if (error) {
                    throw error
                }
                res.status(200).json(results.rows)
            });
            break;
        case "CompanyAdmin" :
            pool.query(`SELECT tickets.*, logs.converter_id, logs.log_event
                FROM tickets
                    INNER JOIN logs ON tickets.log_id = logs.log_id
                    INNER JOIN converters ON logs.converter_id = converters.converter_id
                    INNER JOIN users ON converters.installer_id = users.company_id
                WHERE users.user_id = $1`, [userId], (error: any, results: { rows: any; }) => {
                if (error) {
                    throw error
                }
                res.status(200).json(results.rows)
            });
            break;
    }
});
router.post('/', isLoggedIn, async (req, res) => {
    const id =req.body.converter_id
    const issue = req.body.issue;
    let log_id: number;
    if (!Number.isInteger(id)) {
        return res.status(400).json({error:"converter_id must be an integer!"});
    }
    const {rows} = await pool.query('INSERT INTO logs(converter_id, log_event) VALUES ($1,$2) RETURNING log_id', [id, issue]);
    log_id = rows[0].log_id;
    await pool.query('INSERT INTO tickets (log_id) VALUES ($1) ', [log_id])
    res.status(200).json({success: 'Ticket Added Successfully'});
})


router.delete('/:id',isLoggedIn, async (req:any, res:any) => {
    let id = Number(req.body.log_id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({error:"Id must be an integer!"});
    }

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