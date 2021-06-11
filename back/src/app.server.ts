import { app } from "./app.bootstrap"
import {config } from 'dotenv'
import { DatabaseConnector } from "./app.database";

config({path : 'variables.env'});

const init = async () => {
    const db = await DatabaseConnector.connectDatabase();
    if(db){
        app.listen( process.env.PORT, () => {
        console.log(`App is runing on http://localhost:${process.env.PORT}`)
        })
    }

}

init();