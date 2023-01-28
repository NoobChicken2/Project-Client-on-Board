import express from 'express';
import pool from "../database/databaseConnection";
import bcrypt from "bcrypt";
import {isLoggedIn} from "../middleware/authorizationMiddleware";
import {validateUser, validateUserPatch} from "../middleware/dataValidationMiddleware";

const router = express.Router();


router.get('/',isLoggedIn, (req:any, res:any) => {
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

router.get('/:id',isLoggedIn, async (req:any, resp:any) => {
    let id = Number(req.params.id);
    if (isNaN(id)) {
        return resp.status(400).json({error:"Bad ID format!"});
    }
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


router.get('/company/:id',isLoggedIn, async (req, resp) => {
    let id = Number(req.params.id);
    if (isNaN(id)) {
        return resp.status(400).json({error:"Bad ID format!"});
    }
    pool.query(`SELECT user_id,first_name,last_name,email
                FROM users INNER JOIN converters c on users.user_id = c.owner_id
                           INNER JOIN companies c2 on c2.company_id = c.installer_id
                WHERE c.installer_id = 2 AND users.role = 'Client' GROUP BY user_id`, (err: any, result: { rows: any; }) => {
        if (err) {
            resp.json({error: "Server side issue(GET)"})
        } else {
            resp.status(200).json(result.rows);
        }

    })

})



router.post('/',isLoggedIn,validateUser, async (req, resp) => {

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



router.patch('/:id',isLoggedIn,validateUserPatch, async (req:any, res:any) => {
    const id = Number(req.params.id);
    let updates = req.body;
    if (isNaN(id)) {
        return res.status(400).json({error:"Bad ID format!"});
    }

    if (req.user.role === 'CompanyAdmin' || req.user.role === 'GlobalAdmin'){
        console.log(req.body.password);

        // DO NOT TOUCH.
        if(req.body.password !== undefined) {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    throw err
                }
                updates.password = hash;
                console.log(hash);
                console.log(updates);

                let updatesString = Object.entries(updates)
                    .map(([key, value]) => `${key}='${value}'`)
                    .join(', ');

                console.log(updatesString);

                pool.query(`UPDATE users SET ${updatesString}  WHERE user_id =${id} `, (error: any, results: any) => {
                    if (error) {
                        res.status(500).json({error});
                    }
                    res.status(200).json(results);

                });
            });
        } else {
            let updatesString = Object.entries(updates)
                .map(([key, value]) => `${key}='${value}'`)
                .join(', ');

            console.log(updatesString);

            pool.query(`UPDATE users SET ${updatesString}  WHERE user_id =${id} `, (error: any, results: any) => {
                if (error) {
                    res.status(500).json({error});
                }
                res.status(200).json(results);

            });
        }

    }

});



router.delete('/:id',isLoggedIn, async (req:any, resp:any) => {


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
