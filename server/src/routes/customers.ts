import express from 'express';
import pool from "../database/databaseConnection";
import bcrypt from "bcrypt";
import {isLoggedIn} from "../middleware/authorizationMiddleware";

const router = express.Router();

// @ts-ignore
router.get('/',isLoggedIn, (req, res) => {


    // @ts-ignore
    console.log(req.user)

    pool.query(`SELECT *
                FROM users
                WHERE role = 'Client'`, (err: any, result: { rows: any; }) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows);
    })
});
router.get('/:id', async (req, resp) => {
    let id = req.params.id;
    pool.query(`SELECT *
                FROM users
                WHERE user_id = ${id}`, (err: any, result: { rows: any; }) => {
        if (err) {
            resp.json({error: "Server side issue(GET)"})
        }
        resp.status(200).json(result.rows);
    })

})


// @ts-ignore
router.post('/', async (req, resp) => {
    // @ts-ignore
    console.log(req.user);

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


router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    console.log(updates)

    if(req.body.password !== undefined) {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) {
                throw err
            }
            updates.password = hash;

        });
    }
            const updatesString = Object.entries(updates)
                .map(([key, value]) => `${key}='${value}'`)
                .join(', ');


            pool.query(`UPDATE users SET ${updatesString}  WHERE user_id =${id} `, (error: any, results: any) => {
                if (error) {
                    res.status(500).json({error});
                }
                res.status(200).json(results);

        });

});


router.delete('/:id', async (req, resp) => {
    let user_id = req.params.id;
    pool.query(`DELETE
                FROM users
                WHERE user_id = ${user_id}`, (err: any, result: { rows: any; }) => {
        if (err) {
            return resp.status(400).json({error: "Issue on the server side (DELETE)"})
        }
        return resp.status(200).json("COMPLETE");
    })
})


export default router;
