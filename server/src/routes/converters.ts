import express from 'express';
import pool from "../database/databaseConnection";
import {checkInput, compareLoginDetails} from "../middleware/converterMiddleware";
import {isLoggedIn} from "../middleware/authorizationMiddleware";

const router = express.Router();

router.get('/', isLoggedIn, async (req: any, res: any) => {
    if (req.user.role === 'GlobalAdmin' || req.user.role === "CompanyAdmin") {
        pool.query(`SELECT *
                    FROM converters
                             INNER JOIN converter_details cd on converters.converter_id = cd.converter_id
                             INNER JOIN converter_status cs on converters.converter_id = cs.converter_id
        `, (err: any, result: { rows: any }) => {

            if (err) {
                throw err
            }
            res.status(200).json(result.rows);
        })
    } else {
        return res.status(401).json({error: "Unauthorized access"})
    }

});

router.get('/:id', isLoggedIn, async (req: any, resp: any) => {
    if (req.user.role === 'GlobalAdmin') {
        let id = req.params.id;
        pool.query(`SELECT *
                    FROM converters
                             INNER JOIN converter_details cd on converters.converter_id = cd.converter_id
                             INNER JOIN converter_status cs on converters.converter_id = cs.converter_id
                    WHERE converters.converter_id = ${id}`, (err: any, result: { rows: any }) => {

            if (err) {
                throw err
            }
            resp.status(200).json(result.rows);
        })
    } else {
        return resp.status(401).json({error: "Unauthorized access"})
    }

});

router.get('/owner/:id', isLoggedIn, async (req: any, resp: any,) => {

        let ownerId = req.params.id;
        pool.query(`SELECT *
                    FROM converters
                             INNER JOIN converter_details cd on converters.converter_id = cd.converter_id
                             INNER JOIN converter_status cs on converters.converter_id = cs.converter_id
                    WHERE converters.owner_id = ${ownerId}`, (err: any, result: { rows: any }) => {

            if (err) {
                throw err
            }
            resp.status(200).json(result.rows);
        })

});

router.get('/installer/:id', isLoggedIn, async (req: any, resp: any) => {
    if (req.user.role === 'GlobalAdmin' || req.user.role === 'CompanyAdmin' ) {
        let installerId = req.params.id;
        pool.query(`SELECT *
                    FROM converters
                             INNER JOIN converter_details cd on converters.converter_id = cd.converter_id
                             INNER JOIN converter_status cs on converters.converter_id = cs.converter_id
                    WHERE converters.installer_id = ${installerId}`, (err: any, result: { rows: any }) => {

            if (err) {
                throw err
            }
            resp.status(200).json(result.rows);
        })
    } else {
        return resp.status(401).json({error: "Unauthorized access"})
    }

});

router.get('/:id/logs', isLoggedIn, async (req: any, resp: any) => {

        let converterId = req.params.id;
        pool.query(`SELECT *
                    FROM logs
                    WHERE converter_id = $1 ORDER BY logs.log_id DESC`, [converterId], (err, result) => {
            if (err) {
                return resp.status(400).json({error: "Server side issue(GET)"});
            }
            return resp.status(200).json(result.rows);
        });
});

router.post('/', isLoggedIn, async (req: any, resp: any) => {
    if (req.user.role === 'GlobalAdmin'|| req.user.role === 'CompanyAdmin') {
        let ownerId = req.body.owner_id;
        let installerId = req.body.installer_id;
        let expected_throughput = req.body.expected_throughput;

        pool.query('INSERT INTO converters(owner_id,installer_id) VALUES ($1,$2)', [ownerId, installerId, expected_throughput], (err: any, result: { rows: any; }) => {
            if (err) {
                return resp.status(400).json({error: "Server side issue (POST)"})
            }
            return resp.status(201).json(req.body);
        })
    } else {
        return resp.status(401).json({error: "Unauthorized access"})
    }
});


router.patch('/:id', isLoggedIn, async (req: any, res: any) => {
    if (req.user.role === 'GlobalAdmin' || req.user.role === 'CompanyAdmin') {
        const id = req.params.id;
        const updates: any = req.body;

        let converterDetailsUpdate: any = {};
        let converterUpdate: any = {};


        if (updates.converter_name !== undefined && updates.converter_name !== '')
            converterDetailsUpdate.converter_name = updates.converter_name;
        if (updates.expected_throughput !== undefined && updates.expected_throughput !== '')
            converterDetailsUpdate.expected_throughput = updates.expected_throughput;
        if (updates.serial_number !== undefined && updates.serial_number !== '')
            converterDetailsUpdate.serial_number = updates.serial_number;

        if (updates.owner_id !== undefined && updates.owner_id !== '')
            converterUpdate.owner_id = updates.owner_id;
        if (updates.installer_id !== undefined && updates.installer_id !== '')
            converterUpdate.installer_id = updates.installer_id;


        if (Object.keys(converterUpdate).length > 0 && req.user.role === 'GlobalAdmin') {

            const converterUpdatesString = Object.entries(converterUpdate)
                .map(([key, value]) => `${key}='${value}'`)
                .join(', ');


            pool.query(`UPDATE converters
                        SET ${converterUpdatesString}
                        WHERE converter_id = ${id}`, (error: any, results: any) => {
                if (error) {
                    res.status(500).json({error});
                } else {
                    res.status(200).json(results);
                }
            });
        }


        if (Object.keys(converterDetailsUpdate).length > 0) {
            const converterDetailsString = Object.entries(converterDetailsUpdate)
                .map(([key, value]) => `${key}='${value}'`)
                .join(', ');


            pool.query(`UPDATE converter_details
                        SET ${converterDetailsString}
                        WHERE converter_id = ${id}`, (error: any, results: any) => {
                if (error) {
                    res.status(500).json({error});
                } else {
                    res.status(200).json(results);
                }
            });
        }
    }else {
        return res.status(401).json({error: "Unauthorized access"})
    }
});


router.delete('/:id', isLoggedIn, async (req: any, resp: any) => {
    if (req.user.role === 'GlobalAdmin'|| req.user.role === 'CompanyAdmin') {
        let converter_id = req.params.id;
        pool.query(`DELETE
                    FROM converters
                    WHERE converter_id = ${converter_id}`, (err) => {
            if (err) {
                throw err
            }
            return resp.status(200).json("COMPLETE");
        })
    } else {
        return resp.status(401).json({error: "Unauthorized access"})
    }
})


export default router;
