import express from 'express';
import pool from "../database/databaseConnection";
const router = express.Router();

router.get('/',async (req,res) => {
    pool.query(`SELECT * FROM users WHERE role = 'Client'`,(err:any,result: { rows:any;})  => {
        if (err){
            throw err
        }
        res.status(200).json(result.rows);
    })
});
router.get('/:id',async (req,resp) => {
    let id = req.params.id;
    pool.query(`SELECT *  FROM users WHERE user_id = ${id}`,(err:any,result: {rows:any;}) => {
        if (err){
            resp.json({error:"Server side issue(GET)"})
        }
        resp.status(200).json(result.rows);
    })

})

router.get('/username',async(req,resp,) => {
    let username = req.body.username;
    pool.query(`SELECT * FROM users WHERE user_id = ${username}`,(err:any,result:{rows:any}) =>{
        if (err){
            return resp.status(400).json({error:"Server side issue(GET)"});
        }
        return resp.status(200).json(result.rows)
    });
});


router.post('/',async(req,resp) => {
    let userId = req.body.user_id;
    let role = "Client";
    let username = req.body.username;
    let password = req.body.password;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let phone_number = req.body.phone_number;

    pool.query('INSERT INTO users(user_id,role,username,password,first_name,last_name,email,phone_number) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',[userId,role,username,password,first_name,last_name,email,phone_number],(err:any,result:{rows:any;}) => {
        if (err){
            return resp.status(400).json({error:"Server side issue (POST)"})
        }
        return resp.status(201).json(req.body);
    })
});

router.patch('/:id',async(req,resp) => {
    let user_id = req.params.id
    ///choose what can be PACTHED
    pool.query(`UPDATE converters SET expected_throughput = ${n_expected_throughput} WHERE converter_id = ${user_id}`,(err:any,result) => {
        if(err){
            return resp.status(400).json({error:"Server side issue (PATCH)"})
        }
        return resp.status(200);
    })
});

router.delete('/:id',async(req,resp) => {
    let user_id = req.params.id;
    pool.query(`DELETE FROM users WHERE user_id = ${user_id}`,(err) => {
        if (err){
            return resp.status(400).json({error:"Issue on the server side (DELETE)"})
        }
        return resp.status(200);
    })
})


export default router;
