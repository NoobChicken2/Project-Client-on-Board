// this comment does not serve any purpose, just to be able to make a commit (git merge workaround)
import {Pool} from 'pg';

const pool = new Pool({
    user: 'admin',
    host: '20.101.123.49',
    database: 'postgres',
    password: 'rP9S%557bx!V',
    port: 8080,
});

export default pool;