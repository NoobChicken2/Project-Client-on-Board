import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;
const ticketRouter = require('routes/ticket')

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    // res.send('Hello World!')
    res.json({msg: "hello world"});
});

app.use('/tickets', ticketRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
