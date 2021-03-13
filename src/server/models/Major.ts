import { model, Schema } from 'mongoose'
import { IMajorDoc } from './../types/major'
import Department from './Department'

const majorSchema = new Schema({
  slug: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: Department,
    autopopulate: true,
    required: true,
  },
  isComingSoon: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true })

majorSchema.plugin(require('mongoose-autopopulate'))

export default model<IMajorDoc>('Major', majorSchema)
