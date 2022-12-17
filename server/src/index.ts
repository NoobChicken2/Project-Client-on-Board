import express from 'express';
import cors from 'cors';

import ticket from './routes/ticket';
import companyAdmin from './routes/companyAdministrators';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/tickets', ticket);
app.use('/companyAdmins', companyAdmin);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});