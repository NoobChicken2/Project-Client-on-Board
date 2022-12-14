import express from 'express';
import pool from "../database/databaseConnection";
const router = express.Router();


router.get('/', async (req, res) => {
    pool.query('SELECT * FROM tickets', (error: any, results: { rows: any; }) => {
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

router.patch('/:id', async (req, res) => {
    let t_id = req.params.id
    let l_id = req.body.log_id

    pool.query(`UPDATE tickets
                SET log_id = ${l_id}
                WHERE ticket_id = ${t_id}`, (error: any, results: { rows: any; }) => {
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