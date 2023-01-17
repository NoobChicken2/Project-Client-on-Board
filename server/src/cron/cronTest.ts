import pool from "../database/databaseConnection";
import {QueryResult} from "pg";

const cron = require("node-cron")

const express = require("express")

export function runCronJob() {
    cron.schedule('*/5 * * * * *', async () => {
       // await fetchConverters();
       await fetchStatus(29);
    });
}

async function fetchConverters(){
    const result = await pool.query('SELECT api_deviceId FROM converter_details');

    for (let i = 0; i < result.rows.length; i++) {
        fetchConverterData(result.rows[i].api_deviceid);
        console.log(result.rows[i].api_deviceid)
    }
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



// @ts-ignore
async function fetchStatus(converterId){
    let statusUpdate;
    let foreignConverter:any;

    const result =await pool.query(`SELECT api_deviceid FROM converters INNER JOIN converter_details cd on converters.converter_id = cd.converter_id WHERE converters.converter_id = ${converterId}`);

    let deviceId = result.rows[0].api_deviceid;
    let status =  await fetchConverterData2(deviceId)
    console.log(status)




    // pool.query(`UPDATE converter_status SET status = ${status} WHERE converter_id = ${converterId}`,(err:any, result:{rows:any}) => {
        //     if (err){
        //         throw err
        //     }
        //     return result.rows;
        // })
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

