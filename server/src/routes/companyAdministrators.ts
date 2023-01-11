import express from 'express';
import bcrypt from "bcrypt";
import pool from "../database/databaseConnection";

const router = express.Router();

// Added encryption of password
router.post('/', async (req, resp) => {


    bcrypt.hash(req.body.password, 10, function (err, hash) {
        let role = req.body.role;
        let username = req.body.username;
        let password = hash;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let email = req.body.email;
        let phone_number = req.body.phone_number;
        let body = {
            role,
            username,
            password,
            first_name,
            last_name,
            email,
            phone_number
        }

        pool.query(`INSERT INTO users (role, username, password, first_name, last_name, email, phone_number)
                    VALUES ($1, $2, $3, $4, $5, $6,
                            $7)`, [role, username, password, first_name, last_name, email, phone_number], (err: any, result: { rows: any; }) => {
            if (err) {
                throw err
                return resp.status(400).json({error: "Server side issue (POST)"})
            }
            // @ts-ignore
            return resp.status(201).json(body);
        })
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