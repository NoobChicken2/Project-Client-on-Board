import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import  {ticketRouter}  from './routes/ticket';


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/tickets',ticketRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
