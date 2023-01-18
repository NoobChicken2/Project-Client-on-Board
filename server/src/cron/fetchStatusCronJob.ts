import pool from "../database/databaseConnection";
import {QueryResult} from "pg";

const cron = require("node-cron")

const express = require("express")

export function runUpdateStatusCronJob() {
    cron.schedule('*/5 * * * *', async () => {
        await fetchConverters();
    });
}

async function fetchConverters() {
    const result = await pool.query(`SELECT converter_id
                                     FROM converters`);

    for (let i = 0; i < result.rows.length; i++) {
        let deviceId = result.rows[i].converter_id;

        let status = await fetchConverterStatus(deviceId);
        await createTicket(status, deviceId);
    }
}

async function addLog(status: string, converter_id: number): Promise<number> {

    let log_id: number;
    const result = await pool.query(`INSERT INTO logs (converter_id, log_event)
                                     VALUES ($1, $2) RETURNING log_id`, [converter_id, status]);

    log_id = result.rows[0].log_id;
    return log_id;
}

async function updateStatus(converter_id: number, status: string) {
    await pool.query(`UPDATE converter_status
                      SET status = ($1)
                      WHERE converter_id = ($2)`, [status, converter_id]);

}

async function createTicket(status: string, converter_id: number) {
    let log_id = await addLog(status, converter_id);

 await updateStatus(converter_id, status);

    if (status !== 'Ok') {
        await pool.query(`INSERT INTO tickets (log_id)
                          VALUES ($1)`, [log_id]);
    }
    if (status === 'Ok') {
        await pool.query(`DELETE
                          FROM tickets
                          WHERE log_id = $1`, [log_id]);
    }
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

