import pool from "../database/databaseConnection";
import {QueryResult} from "pg";

const cron = require("node-cron")

const express = require("express")

export function runUpdateThroughputCronJob() {
    cron.schedule('*/2 * * * *', async () => {

    });


    async function fetchConverterPowerGenerated(deviceId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:3060/v1/devices/${deviceId}/status`)
                .then(response => response.json())
                .then(data => {
                    resolve(data.device.generatorPower);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}
