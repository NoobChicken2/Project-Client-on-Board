import express from 'express';
import cors from 'cors';

import ticket from './routes/ticket';
import companyAdmin from './routes/companyAdministrators';
import converter from'./routes/converters'
import customers from "./routes/customers";
import companies from "./routes/companies"
import token from './routes/token';
import {runUpdateStatusCronJob} from "./cron/fetchStatusCronJob";
import {runUpdateThroughputCronJob} from "./cron/fetchThroughputCronJob";
import {apiToken, handleToken, logIn} from "./cron/serverAPILoginScript";

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
app.get('/converters', () => {
});


app.listen(port, () => {
    console.log(`Backend API listening on port ${port}`)
});

// log in to the converter dummy API and start CRON jobs
async function setUpCron() {
    await logIn().then((response) => {
        if (response.error !== undefined){
            console.log(response.error);
        } else {
            handleToken(response);
        }
    })

    runUpdateStatusCronJob();
    runUpdateThroughputCronJob();

}

setUpCron();