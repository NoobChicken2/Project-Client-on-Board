import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    // res.send('Hello World!')
    res.json({ msg: "hello world"});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

// copy from converter branch, testing
import {Client} from 'pg';

const client = new Client({
    host: "localhost",
    user: "admin",
    password: "admin123",
    database: "postgres",
    port: 7000
})

client.connect()
    .then(() => console.log("Success"))
    .then(() => client.query("select * from users where role='CompanyAdmin'"))
    .then((results: { rows: any }) => console.table(results.rows))
    .catch((e: any) => console.log(e))
    .then(() => client.end())