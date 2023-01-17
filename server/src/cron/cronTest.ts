import pool from "../database/databaseConnection";

const cron = require("node-cron")

const express = require("express")

export function runCronJob() {
    cron.schedule('*/5 * * * * *', async () => {
        const result = await pool.query('SELECT api_deviceId FROM converter_details');

        for (let i = 0; i < result.rows.length; i++) {
            fetchConverterData(result.rows[i].api_deviceid);
            console.log(result.rows[i].api_deviceid)
        }
    });
}


async function addLog(status: string, converter_id: number): Promise<number> {
    let dateTime = new Date()

    let log_id: number;
    const result = await pool.query(`INSERT INTO logs (converter_id, log_event, created_at)
                                     VALUES ($1, $2, $3) RETURNING log_id`, [converter_id, status, dateTime]);

    log_id = result.rows[0].log_id;

    return log_id;
}

function createTicket() {

}

function fetchConverterData(deviceId: string) {
    fetch(`http://localhost:3060/v1/devices/${deviceId}/status`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

