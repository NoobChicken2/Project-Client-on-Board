import express from 'express';
import pool from "../database/databaseConnection";
import {isLoggedIn} from "../middleware/authorizationMiddleware";

const router = express.Router();


router.get('/',isLoggedIn, async (req:any, res:any) => {

    if ( req.user.role === 'GlobalAdmin'){
        pool.query(`SELECT *
                FROM companies`, (error: any, results: { rows: any }) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
    } else {
        res.status(401).json({error:"Unauthorized access"})
    }

});

router.get('/:id',isLoggedIn, async (req:any, res:any) => {
    let id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({error:"Bad ID format!"});
    }

    if ( req.user.role === 'GlobalAdmin'){
        let id = req.params.id;
        pool.query(`SELECT *
                FROM companies
                WHERE company_id = ${id}`, (err: any, results: { rows: any; }) => {
            if (err) {
                res.status(500).json({error: "Server side issue(GET)"})
            }
            if (results.rows.length !== 1) {
                return res.status(404).json({error:"Company with ID " + id + " does not exist!"});
            }

            res.status(200).json(results.rows);
        })
    } else {
        res.status(401).json({error:"Unauthorized access"})
    }
});

router.post('/',isLoggedIn, async (req:any, res:any) => {

    if ( req.user.role === 'GlobalAdmin') {
        let company_name = req.body.company_name;
        for (let property in req.body) {

            if (company_name == null || company_name === "") {
                return res.status(400).json({error: "Company name must be provided!"});
            }

            if (company_name.length > 25) {
                return res.status(400).json({error: "Company name too long!"});
            }

            pool.query(`INSERT INTO companies (company_name)
                        VALUES ($1)`, [company_name], (err: any, result: { rows: any; }) => {
                if (err) {
                    return res.status(400).json({error: "Server side issue (POST)"})
                } else {
                    return res.status(201).json(result.rows[0]);
                }


            })
        }
    }else {
        res.status(401).json({error:"Unauthorized access"})
    }
})


router.patch('/:id',isLoggedIn, async (req:any, res:any) => {
    if ( req.user.role === 'GlobalAdmin'){
        const id = req.params.id;
        const updates = req.body;

        const updatesString = Object.entries(updates)
            .map(([key, value]) => `${key}='${value}'`)
            .join(', ');


        pool.query(`UPDATE companies
                SET ${updatesString}
                WHERE company_id = ${id} `, (error: any, results: any) => {
            if (error) {
                if (error.code == 42703) {
                    return res.status(400).json({error:"Cannot PATCH: One or more fields does not exist!"});
                }
                res.status(500).json({error});
            } else {
                return res.status(200).json(results.rows);
            }
        });
    } else {
        res.status(401).json({error:"Unauthorized access"})
    }
});

router.delete('/:id',isLoggedIn, async (req:any, resp:any) => {
    let company_id = Number(req.params.id);
    if (isNaN(company_id)) {
        return resp.status(400).json({error:"Bad ID format!"});
    }

    if ( req.user.role === 'GlobalAdmin'){
        let company_id = req.params.id;
        pool.query(`DELETE
                FROM companies
                WHERE company_id = ${company_id}`, (err, results: { rows: any; }) => {
            if (err) {
                return resp.status(400).json({error: "Issue on the server side (DELETE)"})
            }

            return resp.status(200).json(results.rows);
        })
    } else {
        resp.status(401).json({error:"Unauthorized access"})
    }
})

export default router;