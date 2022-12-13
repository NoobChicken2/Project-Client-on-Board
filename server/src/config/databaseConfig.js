const mysql = require('mysql2');
const {Client} = require('ssh2')
const sshClient = new Client();


const dbServer = {
    host: "localhost",
    port:5432,
    user:"admin",
    password: "admin123",
    database: "postgres"
}
const tunnelConfig ={
    host:"23.97.194.191",
    port: 22,
    username:"vm001admin",
    password:"oEXfpxSTxdFKNq101!"
}
const forwardConfig = {
    srcHost: "127.0.0.1",
    srcPort:3306,
    dstHost:dbServer.host,
    dstPort: dbServer.port
};

const SSHConnection = new Promise((resolve, reject) => {
    sshClient.on('ready',() => {
        sshClient.forwardOut(
            forwardConfig.srcHost,
            forwardConfig.srcPort,
            forwardConfig.dstHost,
            forwardConfig.dstPort,
            (err,stream) => {
                if (err) reject(err);

                const updatedDbServer = {
                    host: "localhost",
                    port:5432,
                    user:"admin",
                    password: "admin123",
                    database: "postgres",
                    stream
                };

                const connection = mysql.createConnection(updatedDbServer);

                connection.connect((error) => {
                    if (error){
                        reject(error)
                    }
                    resolve(connection);
                });
            });
    }).connect(tunnelConfig);
});

export {SSHConnection}
