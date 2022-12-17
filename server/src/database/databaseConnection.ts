import {Pool} from 'pg';

const pool = new Pool({
    user: 'admin',
    host: '23.97.194.191',
    database: 'postgres',
    password: 'rP9S%557bx!V',
    port: 8000,
});

export default pool;