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

        const ownerId = req.body.owner_id;
        const installerId = req.body.installer_id;
        const converter_id = req.body.converter_id;
        const expected_throughput = req.body.expected_throughput;
        const serial_number = req.body.serial_number;
        const converter_name = req.body.converter_name;
        const converter_status = 'Ok';


        try {
            await pool.query('INSERT INTO converters(converter_id,owner_id,installer_id) VALUES ($1,$2,$3)', [converter_id, ownerId, installerId])
            await pool.query(`INSERT INTO converter_details(serial_number, converter_name, expected_throughput, converter_id)
            VALUES ($1,$2,$3,$4)`, [serial_number ,converter_name,expected_throughput,converter_id ])
            await pool.query('INSERT INTO converter_status(converter_id, status) VALUES ($1,$2)', [converter_id, converter_status])
            return resp.status(201).json(req.body);
        } catch(err) {
            return resp.status(400).json({error: "Server side issue (POST)"});
        }


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

        console.log("converters " + converterUpdate)
        console.log("details " + converterDetailsUpdate)

        try{

     if (Object.keys(converterUpdate).length > 0 && req.user.role === 'GlobalAdmin') {

            const converterUpdatesString = Object.entries(converterUpdate)
                .map(([key, value]) => `${key}='${value}'`)
                .join(', ');


            await   pool.query(`UPDATE converters SET ${converterUpdatesString} WHERE converter_id = $1`,[id]);
        }

        if (Object.keys(converterDetailsUpdate).length > 0) {
            const converterDetailsString = Object.entries(converterDetailsUpdate)
                .map(([key, value]) => `${key}='${value}'`)
                .join(', ');



            await  pool.query(`UPDATE converter_details
                        SET ${converterDetailsString}
                        WHERE converter_id = $1`,[id]);
        }

        return res.status(201).json(req.body);
    } catch(err) {
        return res.status(400).json({error: "Server side issue (POST)"});
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
