import pool from "../database/databaseConnection";
import {QueryResult} from "pg";
import {addLog, getConverterIds} from "./fetchStatusCronJob";

const cron = require("node-cron")

const express = require("express")

const LOW_THROUGHPUT_MULTIPLIER = 0.7;


export async function runUpdateThroughputCronJob() {
    cron.schedule('0 0 * * *', async () => {
        await fetchConvertersThroughputs()
    });
}

async function fetchConverterThroughput(deviceId: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3060/v1/devices/${deviceId}/measurements/sets/EnergyAndPowerBattery/Day`)
            .then(response => response.json())
            .then(data => {
                resolve(Math.round(data.pvGeneration));
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function fetchConvertersThroughputs() {
    const result = await getConverterIds();

    for (let i = 0; i < result.rows.length; i++) {
        let deviceId = result.rows[i].converter_id;

        let throughput = await fetchConverterThroughput(deviceId);

        if (throughput !== undefined) {
            await updateThroughPut(throughput, deviceId)
        }
    }
}

async function updateThroughPut(throughput: number, converterId: number) {
    try {
        await pool.query(`UPDATE converter_details
                          SET throughput = ($1)
                          WHERE converter_id = ($2)`, [throughput, converterId]);

        const log_id = await addLog("Daily throughput: " + throughput, converterId);


        const result = await pool.query(`SELECT expected_throughput
                                         FROM converter_details
                                         WHERE converter_id = ($1)`, [converterId]);
        const expectedThroughput = result.rows[0].expected_throughput

        if (throughput < expectedThroughput * LOW_THROUGHPUT_MULTIPLIER) {
            //add log
            await pool.query(`INSERT INTO tickets (log_id)
                              VALUES ($1)`, [log_id]);
        } else {
            //delete tickets for that converter that are for low throughput
            await pool.query(`DELETE
                              FROM tickets
                              WHERE log_id IN (SELECT log_id
                                               FROM logs
                                               WHERE converter_id = $1
                                                 AND log_event LIKE 'Daily throughput:%')`, [converterId]);

            let newExpectedThroughput = Math.round((throughput + expectedThroughput) / 2);


        }

    } catch (err) {
        console.error(`Error in query: ${err}`);
    }
}







