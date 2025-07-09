import PostgreSql from "./config/postgresql/postgres.ts";
import express from 'express';
import cors from 'cors';
import PostDataBase from "./config/mongoModels.js/postDataBase.ts";
import * as dotenv from 'dotenv';
import UserController from "./controllers/userController.ts";
import UserRoutes from "./routes/userRoutes.ts";
dotenv.config();
// import postDataBase from "./src/config/mongoModels.js/postDataBase.js";




class ServerCommunication {
    private app
    private postgresql: PostgreSql;
    private mongoDB: PostDataBase;
    private port: number;
    constructor(postgresql: PostgreSql, mongoDB: PostDataBase,) {
        this.postgresql = postgresql
        this.mongoDB = mongoDB
        const userController = new UserController(this.postgresql, this.mongoDB);
        const userRoutes = new UserRoutes(userController).getRouter();
        this.port = Number(process.env.PORT) || 3000;
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(`/api`,userRoutes)
        this.postgresql.connectToPostgre();
    }


    async start(): Promise<void> {

        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        })

        process.on('unhandledRejection', (reason, promise) => {
            console.error('Unhandled Rejection at:', promise, 'reason:', reason);
          });
    }
}


const posgresql = new PostgreSql()
const mongoDB = new PostDataBase()
const serverCommunication = new ServerCommunication(posgresql,mongoDB);

serverCommunication.start();