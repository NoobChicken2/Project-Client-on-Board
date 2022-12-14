import express from 'express'
export const ticketRouter = express.Router();
ticketRouter.use(express.json());


const Pool = require('pg').Pool
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'postgres',
    password: 'admin123',
    port: 7000,
})


ticketRouter.get('/', async (req, res) => {
    pool.query('SELECT * FROM tickets', (error: any, results: { rows: any; }) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

ticketRouter.get('/:id', async (req, res) => {
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

ticketRouter.post('/', async (req, res) => {
    let id = req.body.log_id
    pool.query(`INSERT INTO tickets (log_id)
                VALUES (${id})`, (error: any, results: { rows: any; }) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })

});

ticketRouter.patch('/:id', async (req, res) => {
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

ticketRouter.delete('/:id', async (req, res) => {
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
