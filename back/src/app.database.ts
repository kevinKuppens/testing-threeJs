import { connect } from "mongoose";


export class DatabaseConnector{
    static async connectDatabase(){
         try{
            return await connect(process.env.DB_URI || '', {
                useCreateIndex:true,
                useFindAndModify:true,
                useNewUrlParser:true,
                useUnifiedTopology:true
            });
        }catch(e){
            return false;
        }
    }
}