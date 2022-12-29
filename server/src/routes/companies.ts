import express from 'express';
import pool from "../database/databaseConnection";

const router = express.Router();

router.get('/', async (req, res) => {
    pool.query(`SELECT *
                FROM companies`, (error: any, results: { rows: any }) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    pool.query(`SELECT *
                FROM companies
                WHERE company_id = ${id}`, (err: any, results: { rows: any; }) => {
        if (err) {
            res.json({error: "Server side issue(GET)"})
        }
        res.status(200).json(results.rows);
    })
});

router.post('/', async (req, res) => {
    let company_name = req.body.company_name;

    pool.query(`INSERT INTO companies (company_name)
                VALUES ($1)`, [company_name], (err: any, result: { rows: any; }) => {
        if (err) {
            return res.status(400).json({error: "Server side issue (POST)"})
        }
        return res.status(201).json(req.body);
    })
});

router.patch('/:id', async (req, res) => {
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
});

router.delete('/:id', async (req, resp) => {
    let company_id = req.params.id;
    pool.query(`DELETE
                FROM companies
                WHERE company_id = ${company_id}`, (err, result: { rows: any; }) => {
        if (err) {
            return resp.status(400).json({error: "Issue on the server side (DELETE)"})
        }
        return resp.status(200).json("COMPLETE");
    })
})

export default router;