import express from 'express';
import pool from "../database/databaseConnection";
const router = express.Router();



router.get('/',async (req,res) => {
pool.query('SELECT * FROM converters',(err:any,result: { rows:any;})  => {
    if (err){
        throw err
    }
    res.status(200).json(result.rows);
})
});
router.get('/:id',async (req,resp) => {
    let id = req.params.id;
    pool.query('SELECT *  FROM converters WHERE converter_id = $1',[id],(err:any,result: {rows:any;}) => {
        if (err){
            resp.json({error:"Server side issue(GET)"})
        }
        resp.status(200).json(result.rows);
    })

})

router.get('/owner/:id',async(req,resp,) => {
    let ownerId = req.params.id;
    pool.query('SELECT * FROM converters WHERE owner_id = $1',[ownerId],(err:any,result:{rows:any}) =>{
        if (err){
            return resp.status(400).json({error:"Server side issue(GET)"});
        }
        return resp.status(200).json(result.rows)
    });
});
router.get('/installer/:id',async(req,resp) => {
    let installerId = req.params.id;
    pool.query('SELECT * FROM converters WHERE installer_id = $1',[installerId],(err:any,result:{rows:any}) => {
        if (err){
            return resp.status(400).json({error:"Server side issue(GET)"});
        }
        return resp.status(200).json(result.rows);
    });
});

router.post('/',async(req,resp) => {
    let converterId = req.body.converter_id;
    let ownerId = req.body.owner_id;
    let installerId = req.body.installer_id;
    let expected_throughput = req.body.expected_throughput;

    pool.query('INSERT INTO converters(converter_id,owner_id,installer_id,expected_throughput) VALUES ($1,$2,$3,$4)',[converterId,ownerId,installerId,expected_throughput],(err:any,result:{rows:any;}) => {
        if (err){
            return resp.status(400).json({error:"Server side issue (POST)"})
        }
        return resp.status(201).json(req.body);
    })
});

router.patch('/:id',async(req,resp) => {
    let converter_id = req.params.id
   let n_expected_throughput = req.body.expected_throughput;

   pool.query(`UPDATE converters SET expected_throughput = ${n_expected_throughput} WHERE converter_id = ${converter_id}`,(err:any,result) => {
       if(err){
           return resp.status(400).json({error:"Server side issue (PATCH)"})
       }
       return resp.status(200);
   })
});

router.delete('/:id',async(req,resp) => {
    let converter_id = req.params.id;
    pool.query(`DELETE FROM converters WHERE converer_id = ${converter_id}`,(err) => {
        if (err){
            return resp.status(400).json({error:"Issue on the server side (DELETE)"})
        }
        return resp.status(200);
    })
})


export default router;
