import express from 'express';
import cors from 'cors';
import converterRouter from "./routes/converterScript";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/converters',converterRouter);

app.get('/', (req, res) => {
    console.log(req);
    // res.send('Hello World!')
    res.json({ msg: "hello world"});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});