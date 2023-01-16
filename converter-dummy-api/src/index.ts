let express = require('express');
const app = express();
const port = 3060;

app.listen(port, () => {
    console.log(`Converter API listening on port ${port}`)
});

let converter: { plant: { timezone: string; name: string; plantId: string; description: string; } | { plantId: string; name: string; description: string; timezone: string; }; device: { product: string; operationStatus: string; productId: number; timezone: string; deactivatedAt: string; type: string; isActive: boolean; deviceId: string; generatorPower: number; serial: string; vendor: string; name: string; isSmartConnectedReady: boolean; status: string; } | { deviceId: string; name: string; timezone: string; type: string; product: string; productId: number; serial: string; vendor: string; generatorPower: number; isActive: boolean; deactivatedAt: string; status: string; operationStatus: string; isSmartConnectedReady: boolean; }; };

converter = {
    "plant": {
        "plantId": "25056",
        "name": "Niestetal Plant",
        "description": "One of the biggest solar plants.",
        "timezone": "Europe/Berlin"
    },
    "device": {
        "deviceId": "302453",
        "name": "SB 3000TL-30",
        "timezone": "Europe/Berlin",
        "type": "Solar Inverters",
        "product": "SB4.0-1AV-41",
        "productId": 9403,
        "serial": "2005890720",
        "vendor": "SMA Solar Technology AG",
        "generatorPower": 4000,
        "isActive": false,
        "deactivatedAt": "2019-04-07T12:30:02",
        "status": "Ok",
        "operationStatus": "Auto",
        "isSmartConnectedReady": true
    }
};

app.get(`/v1/devices/:id/status`, (req: any, res: { json: (arg0: { plant: { timezone: string; name: string; plantId: string; description: string }; device: { product: string; operationStatus: string; productId: number; timezone: string; deactivatedAt: string; type: string; isActive: boolean; deviceId: string; generatorPower: number; serial: string; vendor: string; name: string; isSmartConnectedReady: boolean; status: string } }) => void; }, next: any) => {
    res.json(converter);
});

