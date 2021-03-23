import { model, Schema } from 'mongoose'
import { IRequirementDoc } from './../types/requirement'
import Course from './Course'

const requirementSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    default: 3,
  },
  isFixedAssignment: {
    type: Boolean,
    required: true,
  },
  courseId: {
    type: Number,
  },
  description: {
    type: String,
  },
  links: {
    type: [{
      label: {
        type: String,
        required: true,
      },
      href: {
        type: String,
        required: true,
      },
    }],
  },
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
}
)

requirementSchema.virtual('course', {
  ref: Course,
  localField: 'courseId',
  foreignField: 'data.crseId',
  justOne: true,
  autopopulate: true,
})

requirementSchema.plugin(require('mongoose-autopopulate'))

export default model<IRequirementDoc>('Requirement', requirementSchema)
