import mongoose, { Connection, Mongoose } from 'mongoose'

class Database {
    private readonly _mongo: Mongoose;

    constructor(mongo: Mongoose) {
      this._mongo = mongo
    }

    dbConnection() {
      if (process.env.DB_DEV) {
        this._mongo
          .connect(
            process.env.DB_DEV,
            { useNewUrlParser: true, useUnifiedTopology: true }
          )
        const db: Connection = this._mongo.connection
        db.on('error', console.error.bind(console, 'connection error:'))
        db.once('open', () => {
          console.log('DB connected')
        })
      }
    }

    get mongo() {
      return this._mongo
    }
}

export default Object.freeze(new Database(mongoose))
