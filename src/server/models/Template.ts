import { model, Schema } from 'mongoose'
import { ITemplateDoc } from './../types/template'
import Major from './Major'
import Requirement from './Requirement'

const templateSchema = new Schema({
  majorId: {
    type: String,
    required: true,
  },
  semesters: {
    type: [[{
      type: Schema.Types.ObjectId,
      ref: Requirement,
    }]],
    default: [],
  },
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})

templateSchema.virtual('major', {
  ref: Major,
  localField: 'majorId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
})

templateSchema.plugin(require('mongoose-autopopulate'))

export default model<ITemplateDoc>('Template', templateSchema)
