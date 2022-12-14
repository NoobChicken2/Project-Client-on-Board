import express from 'express';
const router = express.Router();


const Pool = require('pg').Pool
const pool = new Pool({
    user: 'admin',
    host: '23.97.194.191',
    database: 'postgres',
    password: 'rP9S%557bx!V',
    port: 8000,
})


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