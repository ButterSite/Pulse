import PostgreSql from "./src/config/postgresql/postgres.js";
import express from 'express';
import cors from 'cors';
import postDataBase from "./src/config/mongoModels.js/postDataBase.js";
const postgresql = new PostgreSql();

const userData = {
    email: `abcdef@example.com`,
    firstName: `Jan`,
    lastName: `Kowalski`,
    username: `janowski2136`,
    password: `qwerty1234`
}


class ServerCommunication {
    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());

    }


    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        })

        process.on('unhandledRejection', (reason, promise) => {
            console.error('Unhandled Rejection at:', promise, 'reason:', reason);
          });
    }
}

const serverCommunication = new ServerCommunication();

serverCommunication.start();