import express from 'express';
import bcrypt from "bcrypt";
import pool from "../database/databaseConnection";
import {isLoggedIn} from "../middleware/authorizationMiddleware";
import {validateUser, validateUserPatch} from "../middleware/dataValidationMiddleware";

const router = express.Router();

// Added encryption of password

router.post('/',isLoggedIn,validateUser, async (req:any, resp:any) => {

    if (req.user.role === 'GlobalAdmin'){
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        let companyId = Number(req.body.company_id);
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


        pool.query(`INSERT INTO users (company_id,role, username, password, first_name, last_name, email, phone_number)
                    VALUES ($1, $2, $3, $4, $5, $6,
                            $7, $8)`, [companyId,role, username, password, first_name, last_name, email, phone_number], (err: any, results: { rows: any; }) => {
            if (err) {
                if (err.code == 23503) {
                    return resp.status(400).json({error:"Cannot post: company_id " + companyId + " does not exist!"});
                } else if (err.code == 23505) {
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
} else {
        return resp.status(401).json({error:'Unauthorized access'})
    }


});


router.get('/:userId',isLoggedIn, async (req:any, res:any) => {
    let userId = Number(req.params.userId);
    if (isNaN(userId)) {
        return res.status(400).json({error:"Bad ID format!"});
    }

    if (req.user.role === 'GlobalAdmin') {
        pool.query(`SELECT *
                FROM users
                WHERE user_id = ${userId}
                  AND role = 'CompanyAdmin'`, (error: any, results: { rows: any; }) => {
            if (error) {
                return res.status(400).json({error: "Server side issue (GET)"})
            }
            if (results.rows.length !== 1) {
                res.status(404).json({error:"CompanyAdmin with ID " + userId + " does not exist!"});
            }

            res.status(200).json(results.rows)
        })
    }
});


router.get('/', isLoggedIn,async (req, res) => {
    let query = "SELECT * FROM users WHERE role ='CompanyAdmin'";
    pool.query(query, (error: any, results: { rows: any; }) => {
        if (error) {
            return res.status(400).json({error: "Server side issue (GET)"})
        }
        res.status(200).json(results.rows)
    })

});


router.patch('/:id',isLoggedIn,validateUserPatch, async (req:any, res:any) => {
    const id = Number(req.params.id);
    let updates = req.body;
    if (isNaN(id)) {
        return res.status(400).json({error:"Bad ID format!"});
    }

    if (req.user.role === 'GlobalAdmin') {
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


        pool.query(`UPDATE users
                SET ${updatesString}
                WHERE user_id = ${id}
                  AND role = 'CompanyAdmin'`, (error: any, results: any) => {
            if (error) {
                if (error.code == 23505) {
                    return res.status(409).json(error.detail);
                } else if (error.code == 23514 && error.constraint === "users_email_check") {
                    return res.status(400).json({error:"Bad email format!"});
                } else {
                    return res.status(500).json(error);
                }
            }
            res.status(200).json(results);
        });
    }
})

router.delete('/:id',isLoggedIn, async (req:any, res:any) => {
    let user_id = Number(req.params.id);
    if (isNaN(user_id)) {
        return res.status(400).json({error:"Bad ID format!"});
    }

    if (req.user.role === 'GlobalAdmin') {
        pool.query(`DELETE
                FROM users
                WHERE user_id = ${user_id}`, (error: any, results: { rows: any; }) => {
            if (error) {
                return res.status(400).json({error: "Server side issue (DELETE)"})
            }
            res.status(200).json(results.rows)
        })
    }
})


export default router;