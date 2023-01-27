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
updateConverterThroughOutPuts();

cron.schedule('*/5 * * * *', () => {
    updateConverterStatuses()
});


cron.schedule('*/5 * * * *', () => {
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

            converters[i].pvGeneration = simulateSolarPanelDailyThroughput();

    }
}

function simulateSolarPanelDailyThroughput(): number {
    let throughputs = [];

    for (let i = 0; i < 24; i++) {
        let randomFactor = (Math.random() * 2)  ;

        const minutes = i * 60;

        const sine = Math.sin(minutes / 1440 * 2 * Math.PI);

        const throughput = ((sine + 1) / 2) * randomFactor;

        throughputs.push(throughput);
    }

    return addNumbers(throughputs);
}

function addNumbers(numbers: number[]): number {
    return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
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
    let converter : any;

    for (let i = 0; i < converters.length; i++) {
        if (converters[i].device.deviceId === req.params.id) {
            converter = converters[i];
            break;
        }
    }

    let throughOutPut: number ;

    try {
            throughOutPut = converter.pvGeneration;
    }catch (e){
        throughOutPut = 0;
    }

    if (throughOutPut != undefined || isNaN(throughOutPut)) {
        return res.status(200).json(converter);
    } else {
        return res.status(400).json({error: "Server side issue(GET)"});
    }
});



