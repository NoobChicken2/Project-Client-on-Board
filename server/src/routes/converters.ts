import express from 'express';
import pool from "../database/databaseConnection";
import {checkInput,compareLoginDetails} from "../middleware/converterMiddleware";

const router = express.Router();

router.get('/',async (req,res) => {
    pool.query(`SELECT cd.converter_name, cs.status FROM converters INNER JOIN converter_details cd on converters.converter_id = cd.converter_id 
                                                        INNER JOIN converter_status cs on converters.converter_id = cs.converter_id
                                                        `,(err:any,result:{rows:any}) =>{

        if (err){
            throw err
        }
        res.status(200).json(result.rows);
    })
});

router.get('/:id',async (req,resp) => {
    let id = req.params.id;
    pool.query(`SELECT * FROM converters INNER JOIN converter_details cd on converters.converter_id = cd.converter_id 
                                                        INNER JOIN converter_status cs on converters.converter_id = cs.converter_id
                                                        WHERE converters.converter_id = ${id}`,(err:any,result:{rows:any}) =>{

        if (err){
            throw err
        }
        resp.status(200).json(result.rows);
    })
});

router.get('/owner/:id',async(req,resp,) => {
    let ownerId = req.params.id;
    pool.query(`SELECT * FROM converters INNER JOIN converter_details cd on converters.converter_id = cd.converter_id 
                                                        INNER JOIN converter_status cs on converters.converter_id = cs.converter_id
                                                        WHERE converters.owner_id = ${ownerId}`,(err:any,result:{rows:any}) =>{

        if (err){
            throw err
        }
        resp.status(200).json(result.rows);
    })
});

router.get('/installer/:id',async(req,resp) => {
    let installerId = req.params.id;
    pool.query(`SELECT * FROM converters INNER JOIN converter_details cd on converters.converter_id = cd.converter_id 
                                                        INNER JOIN converter_status cs on converters.converter_id = cs.converter_id
                                                        WHERE converters.installer_id = ${installerId}`,(err:any,result:{rows:any}) =>{

        if (err){
            throw err
        }
        resp.status(200).json(result.rows);
    })
});

router.get('/:id/logs' , async(req, resp) => {
    let converterId = req.params.id;
    pool.query(`SELECT * FROM logs WHERE converter_id = $1`, [converterId] , (err, result) =>  {
        if (err){
            return resp.status(400).json({error:"Server side issue(GET)"});
        }
        return resp.status(200).json(result.rows);
    });
});

router.post('/',async(req,resp) => {

    let ownerId = req.body.owner_id;
    let installerId = req.body.installer_id;
    let expected_throughput = req.body.expected_throughput;

    pool.query('INSERT INTO converters(owner_id,installer_id,expected_throughput) VALUES ($1,$2,$3)',[ownerId,installerId,expected_throughput],(err:any,result:{rows:any;}) => {
        if (err){
            return resp.status(400).json({error:"Server side issue (POST)"})
        }
        return resp.status(201).json(req.body);
    })
});

router.patch('/:id',async(req,res) => {
    const id = req.params.id;
    const updates = req.body;

    const updatesString = Object.entries(updates)
        .map(([key, value]) => `${key}='${value}'`)
        .join(', ');


    pool.query(`UPDATE converters
                SET ${updatesString}
                WHERE converter_id = ${id}`, (error: any, results: any) => {
        if (error) {
            res.status(500).json({error});
        }
        res.status(200).json(results);
    });
});

router.delete('/:id',async(req,resp) => {
    let converter_id = req.params.id;
    pool.query(`DELETE FROM converters WHERE converter_id = ${converter_id}`,(err) => {
        if (err){
            throw err
        }
        return resp.status(200).json("COMPLETE");
    })
})


export default router;
