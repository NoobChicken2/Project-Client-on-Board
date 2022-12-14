import express from 'express';
import cors from 'cors';

import ticket from './routes/ticket';


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/tickets', ticket);


app.get('/converters', (req, res) => {
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "admin",
    password: "admin123",
    database: "postgres",
    port: 7000
})

client.connect()
    .then(() => console.log("Success"))
    .then(() => client.query("select * from users"))
    .then((results: { rows: any }) => console.table(results.rows))
    .catch((e: any) => console.log(e))
    .then(() => client.end())