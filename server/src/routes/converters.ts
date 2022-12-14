import express from 'express';
import pool from "../database/databaseConnection";
const router = express.Router();


// router.get('/', async (req, res) => {
//     pool.query('SELECT * FROM tickets', (error: any, results: { rows: any; }) => {
//         if (error) {
//             throw error
//         }
//         res.status(200).json(results.rows)
//     })
// });
router.get('/',async (req,res) => {
pool.query('SELECT * FROM converters',(err:any,result: { rows:any;})  => {
    if (err){
        throw err
    }
    res.status(200).json(result.rows);
})
})
export default router;
