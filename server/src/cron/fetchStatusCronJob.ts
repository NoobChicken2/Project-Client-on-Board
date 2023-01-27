import pool from "../database/databaseConnection";
import {QueryResult} from "pg";
import {stat} from "fs";

const cron = require("node-cron")

const express = require("express")


export function runUpdateStatusCronJob() {
    cron.schedule('*/5 * * * *', async () => {
        await fetchConverters();
    });
}

async function fetchConverters() {
    const result = await getConverterIds();

    for (let i = 0; i < result.rows.length; i++) {
        let deviceId = result.rows[i].converter_id;


        let status = await fetchConverterStatus(deviceId);
        if (status !== undefined) {
            await createTicket(status, deviceId);
        }
    }
}

export async function addLog(event: string, converter_id: number): Promise<any> {

    let log_id: number;

    try {
        const result = await pool.query(`INSERT INTO logs (converter_id, log_event)
                                         VALUES ($1, $2) RETURNING log_id`, [converter_id, event]);

        log_id = result.rows[0].log_id;
        return log_id;

    } catch (err) {
        console.error(`Error while querying converters: ${err}`);
    }
}

async function updateStatus(converter_id: number, status: string) {
    try {
        await pool.query(`UPDATE converter_status
                          SET status = ($1)
                          WHERE converter_id = ($2)`, [status, converter_id]);

    } catch (err) {
        console.error(`Error while querying converters: ${err}`);
    }


}

async function createTicket(status: string, converter_id: number) {
    let log_id = await addLog(status, converter_id);

    await updateStatus(converter_id, status);


    try {
        if (status !== 'Ok') {
            await pool.query(`INSERT INTO tickets (log_id)
                              VALUES ($1)`, [log_id]);
        }
        if (status === 'Ok') {
            //delete tickets for that converter that are not for throughput
            await pool.query(`DELETE
                              FROM tickets
                              WHERE log_id IN (SELECT log_id
                                               FROM logs
                                               WHERE converter_id = $1
                                                 AND log_event NOT LIKE 'Daily throughput:%')`, [converter_id]);

        }

    } catch (err) {
        console.error(`Error while querying converters: ${err}`);
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

export async function getConverterIds() {
    return await pool.query(`SELECT converter_id
                             FROM converters`);
}
