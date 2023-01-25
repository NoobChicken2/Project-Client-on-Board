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
router.post('/manualadd', async (req, res) => {
    let id = Number(req.body.log_id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({error:"log_id must be an integer!"});
    }

    pool.query('SELECT log_id From logs WHERE log_id = id ', (error: any, results: {rows:any}) => {
        if (isNaN(results.rows)){
            return res.status(500).json(error)
        }
    })
    pool.query('INSERT INTO tickets (log_id) values [id]', (error: any, results:{rows:any}) => {
        if (error) {
            return res.status(500).json(error)
        }
        res.status(200).json(results.rows)
    })
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