import express from 'express';
import pool from "../database/databaseConnection";

const router = express.Router();

// create 1 company admin
router.post('/', async (req, res) => {
    let role = "CompanyAdmin";
    let username = req.body.username;
    let password = req.body.password; // todo: currently simplified plain text hash
    let email = req.body.email;
    let phoneNumber = req.body.phone_number;

    pool.query(`INSERT INTO users (role, username, password, email, phone_number)
                VALUES ($1, $2, $3, $4,
                        $5)`, [role, username, password, email, phoneNumber], (error: any, results: { rows: any; }) => {
        if (error) {
            return res.status(400).json({error: "Server side issue (POST)"})
        }
        res.status(201).json(results.rows)
    })

});

// read 1 admin (by id)
router.get('/:userId', async (req, res) => {
    let userId = req.params.userId;

    pool.query(`SELECT *
                FROM users
                WHERE user_id = ${userId}
                  AND role = 'CompanyAdmin'`, (error: any, results: { rows: any; }) => {
        if (error) {
            return res.status(400).json({error: "Server side issue (GET)"})
        }
        res.status(200).json(results.rows)
    })

});

// read all company admins (no params) or read all company admins that matches params
router.get('/', async (req, res) => {
    let query = "SELECT * FROM users WHERE role ='CompanyAdmin'";


    pool.query(query, (error: any, results: { rows: any; }) => {
        if (error) {
            return res.status(400).json({error: "Server side issue (GET)"})
        }
        res.status(200).json(results.rows)
    })

});

// update (patch) 1 company admin by user id
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    const updatesString = Object.entries(updates)
        .map(([key, value]) => `${key}='${value}'`)
        .join(', ');


    pool.query(`UPDATE users
                SET ${updatesString}
                WHERE user_id = ${id}
                  AND role = 'CompanyAdmin'`, (error: any, results: any) => {
        if (error) {
            res.status(500).json({error});
        }
        res.status(200).json(results);
    });

})

// delete 1 company admin by id
router.delete('/:id', async (req, res) => {
    let user_id = req.params.id;
    pool.query(`DELETE
                FROM users
                WHERE user_id = ${user_id}`, (error: any, results: { rows: any; }) => {
        if (error) {
            return res.status(400).json({error: "Server side issue (DELETE)"})
        }
        res.status(200).json(results.rows)
    })
})


export default router;