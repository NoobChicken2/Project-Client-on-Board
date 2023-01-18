import pool from "../database/databaseConnection";
import {QueryResult} from "pg";

const cron = require("node-cron")

const express = require("express")

export function runCronJob() {
    cron.schedule('*/5 * * * * *', async () => {

        await fetchConverters();
        //  await fetchStatus(29);
    });
}

async function fetchConverters() {
    const result = await pool.query(`SELECT converter_id
                                     FROM converters`);

    const test = await pool.query(`SELECT *
                                   FROM logs`);

    console.log(test);

    for (let i = 0; i < result.rows.length; i++) {
        let deviceId = result.rows[i].converter_id;

        let status = await fetchConverterStatus(deviceId);
        await createTicket(status, deviceId);
    }
}

async function addLog(status: string, converter_id: number): Promise<number> {
    console.log(status + converter_id);

    let log_id: number;
    const result = await pool.query(`INSERT INTO logs (converter_id, log_event)
                                     VALUES ($1, $2) RETURNING log_id`, [converter_id, status]);

    log_id = result.rows[0].log_id;
    console.log("log created" + log_id)
    return log_id;
}

async function createTicket(status: string, converter_id: number) {
    console.log(status + converter_id)

    let log_id = await addLog(status, converter_id);

    if (status !== 'Ok') {
        await pool.query(`INSERT INTO tickets ()
                          VALUES ($1)`, [log_id]);
    }
}


async function fetchStatus(converterId: number) {


    const result = await pool.query(`SELECT api_deviceid
                                     FROM converters
                                              INNER JOIN converter_details cd on converters.converter_id = cd.converter_id
                                     WHERE converters.converter_id = ${converterId}`);

    let deviceId = result.rows[0].api_deviceid;
    let status = await fetchConverterData2(deviceId);
    console.log(status);

    pool.query(`UPDATE converter_status
                SET status = ${status}
                WHERE converter_id = ${converterId}`, (err: any, result: { rows: any }) => {
        if (err) {
            throw err
        }
        return result.rows;
    })
}

async function fetchConverterData2(deviceId: QueryResult<any>): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3060/v1/devices/${deviceId}/status`)
            .then(response => response.json())
            .then(data => {
                resolve(data.device.status);
            })
            .catch(error => {
                reject(error);
            });
    });
}


async function fetchConverterStatus(deviceId: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3060/v1/devices/${deviceId}/status`)
            .then(response => response.json())
            .then(data => {
                resolve(data.device.status);
            })
            .catch(error => {
                reject(error);
            });
    });
}

