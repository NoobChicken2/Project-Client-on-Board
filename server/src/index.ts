import express from 'express';
import cors from 'cors';

import ticket from './routes/ticket';
import companyAdmin from './routes/companyAdministrators';
import converter from'./routes/converters'
import customers from "./routes/customers";
import companies from "./routes/companies"
import token from './routes/token';
import global from "./routes/global";
import {runUpdateStatusCronJob} from "./cron/fetchStatusCronJob";
import {runUpdateThroughputCronJob} from "./cron/fetchThroughputCronJob";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/tickets', ticket);
app.use('/companyAdmins', companyAdmin);
app.use('/converters',converter);
app.use('/customers',customers);
app.use('/token', token);
app.use('/companies', companies);
app.use('/users',global);
app.get('/converters', () => {
});


app.listen(port, () => {
    console.log(`Backend API listening on port ${port}`)
});

runUpdateStatusCronJob();

runUpdateThroughputCronJob()
