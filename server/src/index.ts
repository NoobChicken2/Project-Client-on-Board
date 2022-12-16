import express from 'express';
import cors from 'cors';

import ticket from './routes/ticket';
import converter from'./routes/converters'
import customers from "./routes/customers";


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/tickets', ticket);
app.use('/converters',converter);
app.use('/customers',customers)



app.get('/converters', (req, res) => {
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});




