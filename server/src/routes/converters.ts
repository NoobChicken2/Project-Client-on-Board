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
            resp.json({error:"Server side issue"})
        }
        resp.status(200).json(result.rows);
    })

})
export default router;
