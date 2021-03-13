import { model, Schema } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'
import { IUserDoc } from './../types/user'

const userSchema = new Schema({
  authProvider: {
    // 'google'
    type: String,
  },
  providerId: {
    type: String,
  },
  providerData: {
    type: Schema.Types.Mixed,
  },
}, { timestamps: true })

userSchema.plugin(autopopulate)

export default model<IUserDoc>('User', userSchema)
