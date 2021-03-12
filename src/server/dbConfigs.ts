import mongoose, { Connection, Mongoose } from 'mongoose';
import { configs } from './configs';
import { IConfigs } from "./domain/IConfigs";

class Database {
    private readonly _config: IConfigs;
    private readonly _mongo: Mongoose;

    constructor(config: IConfigs, mongo: Mongoose) {
        this._config = config;
        this._mongo = mongo;
    }

    dbConnection(): Mongoose {
        const { mongoUrl } = this._config;
        this._mongo
            .connect(
                mongoUrl,
                {useNewUrlParser: true, useUnifiedTopology: true}
            );
        const db: Connection = this._mongo.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            console.log("DB connected")
        })
        return mongoose;
    }

    get mongo() {
        return this._mongo;
    }

    get config() {
        return this._config;
    }
}

export default Object.freeze(new Database(configs, mongoose));
