import express from 'express';
import pool from "../database/databaseConnection";
import bcrypt from "bcrypt";
import {isLoggedIn} from "../middleware/authorizationMiddleware";
import {validateUser, validateUserPatch} from "../middleware/dataValidationMiddleware";

const router = express.Router();

// @ts-ignore
router.get('/',isLoggedIn, (req, res) => {
    // @ts-ignore
    console.log(req.user.role)
    // @ts-ignore
    if (req.user.role === 'CompanyAdmin' || req.user.role === 'GlobalAdmin'){
        pool.query(`SELECT *
                FROM users
                WHERE role = 'Client'`, (err: any, result: { rows: any; }) => {
            if (err) {
                throw err
            }
            res.status(200).json(result.rows);
        })

    }
});
// @ts-ignore
router.get('/:id',isLoggedIn, async (req, resp) => {
    let id = Number(req.params.id);
    if (isNaN(id)) {
        return resp.status(400).json({error:"Bad ID format!"});
    }
    // @ts-ignore
    if (req.user.role === 'CompanyAdmin'){
        pool.query(`SELECT *
                FROM users
                WHERE user_id = ${id}`, (err: any, result: { rows: any; }) => {
            if (err) {
                resp.json({error: "Server side issue(GET)"})
            }
            if (result.rows.length !== 1) {
                resp.status(404).json({error:"Customer with ID " + id + " does not exist!"});
            } else {
                resp.status(200).json(result.rows);
            }
        })
    } else {
        return resp.status(401).json({error:"Unauthorised access"})
    }
})

// @ts-ignore
router.get('/company/:id',isLoggedIn, async (req, resp) => {
    let id = Number(req.params.id);
    if (isNaN(id)) {
        return resp.status(400).json({error:"Bad ID format!"});
    }
    pool.query(`SELECT *
                FROM users
                WHERE company_id = ${id}`, (err: any, result: { rows: any; }) => {
        if (err) {
            resp.json({error: "Server side issue(GET)"})
        }
        if (result.rows.length !== 1) {
            resp.status(404).json({error:"Customer with ID " + id + " does not exist!"});
        } else {
            resp.status(200).json(result.rows);
        }

    })

})


// @ts-ignore
router.post('/',isLoggedIn,validateUser, async (req, resp) => {
    // @ts-ignore
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
        // condition checks
        if (role !== "Client") {
            return resp.status(400).json({error:"Role is not Client!"});
        }
        pool.query(`INSERT INTO users (role, username, password, first_name, last_name, email, phone_number)
                    VALUES ($1, $2, $3, $4, $5, $6,
                            $7)`, [role, username, password, first_name, last_name, email, phone_number], (err: any, results: { rows: any; }) => {
            if (err) {
                if (err.code == 23505) {
                    return resp.status(409).json(err.detail);
                } else if (err.code == 23514 && err.constraint === "users_email_check") {
                    return resp.status(400).json({error:"Bad email format!"});
                } else {
                    return resp.status(500).json(err);
                }
            }
            return resp.status(201).json(results.rows);
        })
    })
});


// @ts-ignore
router.patch('/:id',isLoggedIn,validateUserPatch, async (req, res) => {
    const id = Number(req.params.id);
    const updates = req.body;
    if (isNaN(id)) {
        return res.status(400).json({error:"Bad ID format!"});
    }
    // @ts-ignore
    if (req.user.role === 'CompanyAdmin' || req.user.role === 'GlobalAdmin'){
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
    }


});


// @ts-ignore
router.delete('/:id',isLoggedIn, async (req, resp) => {

    // @ts-ignore
    if (req.user.role === 'CompanyAdmin' || req.user.role === 'GlobalAdmin'){
        let user_id = req.params.id;
        pool.query(`DELETE
                FROM users
                WHERE user_id = ${user_id}`, (err: any, results: { rows: any; }) => {
            if (err) {
                return resp.status(400).json({error: "Issue on the server side (DELETE)"})
            }
                return resp.status(200).json(results.rows);


        })
    }

})


export default router;
