const cron = require("node-cron")

const express = require("express")

cron.schedule('*/5 * * * *', () => {
    console.log('running a task every 5 minutes');

});