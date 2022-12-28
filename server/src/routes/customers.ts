import express from 'express';
import pool from "../database/databaseConnection";
import bcrypt from "bcrypt";
const router = express.Router();

router.get('/', (req,res) => {
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




router.post('/',async(req,resp) => {

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

         pool.query(`INSERT INTO users (role,username,password,first_name,last_name,email,phone_number) VALUES ($1,$2,$3,$4,$5,$6,$7)`,[role,username,password,first_name,last_name,email,phone_number],(err:any,result:{rows:any;}) => {
             if (err){
                 throw err
                 return resp.status(400).json({error:"Server side issue (POST)"})
             }
             return resp.status(201).json(body);
         })
        })
    });







router.patch('/:id',async(req,resp) => {
    let foundBody;
    let user_id = req.params.id
    let updateBody = req.body;

    ///choose what can be PACTHED
    let n_username = req.body.username;
    let n_password = req.body.password;
    let n_first_name = req.body.first_name;
    let n_last_name = req.body.last_name;
    let n_email = req.body.email;
    let n_phone_number = req.body.phone_number;

    pool.query(`SELECT * FROM users WHERE user_id = ${user_id}`,(err:any,result:{rows:any}) => {
        if(err){
            return resp.status(400).json({error:"Server side issue (GET)"})
        }
          foundBody = resp.json(result.rows);
        const newBody = Object.assign(foundBody,updateBody)
        return resp.json( JSON.stringify(newBody));


    })



    // pool.query(`UPDATE users SET username = '${updateBody.username}',password = '${updateBody.password}',first_name ='${updateBody.first_name}',last_name ='${updateBody.last_name}',email = '${updateBody.email}',phone_number = '${updateBody.phone_number}' WHERE user_id = ${user_id}`,(err:any,result:{rows:any}) => {
    //     if(err){
    //         return resp.status(400).json({error:"Server side issue (PATCH)"})
    //     }
    //     return resp.status(200).json("COMPLETE");
    // })

});





router.delete('/:id',async(req,resp) => {
    let user_id = req.params.id;
    pool.query(`DELETE FROM users WHERE user_id = ${user_id}`,(err:any,result:{rows:any;}) => {
        if (err){
            return resp.status(400).json({error:"Issue on the server side (DELETE)"})
        }
        return resp.status(200).json("COMPLETE");
    })
})


export default router;
