import generator from 'generate-password'
import { model, Schema } from 'mongoose'
import { IPlanDoc } from './../types/plan'
import Major from './Major'
import Requirement from './Requirement'
import User from './User'

const planSchema = new Schema({
  majorId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  semesters: {
    type: [[{
      type: Schema.Types.ObjectId,
      ref: Requirement,
    }]],
    default: [],
  },
  shortId: {
    type: String,
    default: () => generator.generate({
      length: 8,
      numbers: true,
    }),
  },
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
}
)

planSchema.virtual('major', {
  ref: Major,
  localField: 'majorId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
})

planSchema.virtual('user', {
  ref: User,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
})

planSchema.plugin(require('mongoose-autopopulate'))

export default model<IPlanDoc>('Plan', planSchema)
