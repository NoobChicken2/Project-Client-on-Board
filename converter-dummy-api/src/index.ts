import converters from "./dummyConverters";

let express = require('express');
const app = express();
const port = 3060;

const cron = require("node-cron")


app.listen(port, () => {
    console.log(`Converter API listening on port ${port}`)
});

let statusMessages = ["Ok", "Off", "CommunicationFault", "Warning", "Alarm", "CommunicationMonitoringFault"];

updateConverterStatuses();

cron.schedule('*/5 * * * *', () => {
    console.log('running a task every 5 minutes');
    updateConverterStatuses()
});


cron.schedule('*/2 * * * * *', () => {
    console.log('running a task every 2 seconds');
    updateConverterThroughOutPuts();
});

function updateConverterStatuses() {
    for (let i = 0; i < converters.length; i++) {
        let randomIndex = Math.floor(Math.random() * 5);
        converters[i].device.status = statusMessages[randomIndex];
    }
}


function updateConverterThroughOutPuts() {

    for (let i = 0; i < converters.length; i++) {
        converters[i].pvGeneration = 0;

        for (let j = 1; j < 24; j++) {
            let random = Math.floor(Math.random() * 10);
            if (Math.sin(j)>0) {
                converters[i].pvGeneration += Math.sin(j) * random;
            }
        }
        console.log(converters[i].pvGeneration);
    }
}


app.get(`/v1/devices/:id/status`, async (req: any, res: any) => {
    let converter;

    for (let i = 0; i < converters.length; i++) {
        if (converters[i].device.deviceId === req.params.id) {
            converter = converters[i];
            break;
        }
    }

    if (converter != undefined) {
        if (statusMessages.indexOf(converter.device.status) === -1) {
            return res.status(200).json("Unknown");
        } else {
            return res.status(200).json(converter);
        }
    } else {
        return res.status(400).json({error: "Server side issue(GET)"});
    }
});


app.get(`/v1/devices/:id/measurements/sets/EnergyAndPowerBattery/Day`, async (req: any, res: any) => {
    let throughOutPut: number = 0;

    for (let i = 0; i < converters.length; i++) {
        if (converters[i].device.deviceId === req.params.id) {
            throughOutPut = converters[i].pvGeneration;
            break;
        }
    }

    if (throughOutPut != undefined || isNaN(throughOutPut)) {

        return res.status(200).json(throughOutPut);

    } else {
        return res.status(400).json({error: "Server side issue(GET)"});
    }
});



