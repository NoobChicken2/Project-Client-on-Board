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
                VALUES ($1, $2, $3, $4, $5)`,[role, username, password, email, phoneNumber], (error: any, results: { rows: any; }) => {
        if (error) {
            return res.status(400).json({error:"Server side issue (POST)"})
        }
        res.status(201).json(results.rows)
    })

});

// read 1 admin (by id)
router.get('/:userId', async (req, res) => {
    let userId = req.params.userId;

    pool.query(`SELECT * FROM users WHERE user_id = ${userId}`, (error: any, results: { rows: any; }) => {
        if (error) {
            return res.status(400).json({error:"Server side issue (GET)"})
        }
        res.status(200).json(results.rows)
    })

});

// read all company admins (no params) or read all company admins that matches params
router.get('/', async (req, res) => {
    let query = "SELECT * FROM users";
    let usernameParam = req.query.username;
    let phoneParam = req.query.phone;
    let emailParam = req.query.email;

    if (usernameParam != undefined || phoneParam != undefined || emailParam != undefined) {
        query += " WHERE ";
    }

    if (usernameParam != undefined) {
        query+= "username='" + usernameParam + "'";
    }

    if (phoneParam != undefined) {
        if (usernameParam != undefined) {
            query += " AND "
        }

        query += "phone_number='" + phoneParam + "'";
    }

    if (emailParam != undefined) {
        if (phoneParam != undefined) {
            query += " AND "
        }

        query += " AND email='" + emailParam + "'";
    }

    console.log(query); // for testing, todo: remove in final product


    pool.query(query, (error: any, results: { rows: any; }) => {
        if (error) {
            return res.status(400).json({error:"Server side issue (GET)"})
        }
        res.status(200).json(results.rows)
    })

});

// update (patch) 1 company admin by id
router.patch('/:userId', async (req, res) => {
    // todo: also patch password?
    let userId = req.params.userId;
    let bodyUsername = req.body.username;
    let bodyEmail = req.body.email;
    let bodyPhone = req.body.phone_number;

    let query = "UPDATE users SET "

    if (bodyUsername != undefined) {
        query += "username='" + bodyUsername + "'";
    }

    if (bodyEmail != undefined) {
        if (bodyUsername != undefined) {
            query += ", ";
        }

        query += "email='" + bodyEmail + "'";

    }

    if (bodyPhone != undefined) {
        if (bodyEmail != undefined) {
            query += ", ";
        }

        query += "phone_number='" + bodyPhone + "'";

    }

    query += (" WHERE user_id=" + userId);

    console.log(query); // for testing

    pool.query(query, (error: any, results: { rows: any; }) => {
        if (error) {
            return res.status(400).json({error:"Server side issue (PATCH)"})
        }
        res.status(200).json(results.rows)
    })



})

// delete 1 company admin by id
router.delete('/:id',async(req,res) => {
    let user_id = req.params.id;
    pool.query(`DELETE FROM users WHERE user_id = ${user_id}`,(error: any, results: { rows: any; }) => {
        if (error) {
            return res.status(400).json({error:"Server side issue (DELETE)"})
        }
        res.status(200).json(results.rows)
    })
})


export default router;