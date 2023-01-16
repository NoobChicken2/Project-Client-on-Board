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

function updateConverterStatuses() {
    for (let i = 0; i < converters.length; i++) {
        let randomIndex = Math.floor(Math.random() * 5);
        converters[i].device.status = statusMessages[randomIndex];
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




