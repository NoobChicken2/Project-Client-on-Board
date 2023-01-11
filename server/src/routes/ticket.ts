import express from 'express';
import pool from "../database/databaseConnection";
const router = express.Router();

router.get('/', async (req, res) => {
    pool.query('SELECT * FROM tickets INNER JOIN logs ON tickets.log_id = logs.log_id', (error: any, results: { rows: any; }) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    pool.query(`SELECT *
                FROM tickets
                         INNER JOIN logs ON tickets.log_id = logs.log_id
                WHERE ticket_id = ${id}`, (error: any, results: { rows: any; }) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

router.post('/', async (req, res) => {
    let id = req.body.log_id
    pool.query(`INSERT INTO tickets (log_id)
                VALUES (${id})`, (error: any, results: { rows: any; }) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })

});

router.delete('/:id', async (req, res) => {
    let id = req.params.id

    pool.query(`DELETE
                FROM tickets
                WHERE ticket_id = ${id}`, (error: any, results: { rows: any; }) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

export default router;