const cron = require("node-cron")

const express = require("express")
import pool from "../database/databaseConnection";

cron.schedule('*/5 * * * * *', () => {
    console.log('running a task every 5 minutes');
    fetchStatus(63);

});

export function fetchStatus(converterId){
    let deviceId;
    pool.query(`SELECT cd.api_deviceid FROM converters INNER JOIN converter_details cd on converters.converter_id = cd.converter_id WHERE cd.converter_id = ${converterId}`,(err:any, result:{rows:any}) => {
        if (err){
            throw err
        }
        deviceId =  result.rows
    })
    let foreignConverter =  fetch('localhost:3060/v1/devices/'+deviceId+'/status',{
        method: 'GET',
        headers: {
            'Content-Type':'application/json',}
    })
    let status = converter.status

    pool.query(`UPDATE converter_status SET status = ${status} WHERE converter_id = ${converterId}`,(err:any, result:{rows:any}) => {
        if (err){
            throw err
        }
        return result.rows;
    })

}