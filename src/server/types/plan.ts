import { Document } from 'mongoose'
import { IMajorDoc } from './major'
import { IRequirementDoc } from './requirement'
import { IUserDoc } from './user'

export interface IPlanDoc extends Document {
  majorId: string
  major: IMajorDoc
  userId?: string
  user?: IUserDoc
  semesters: string[][]
  shortId: string
  createdAt: Date
  updatedAt: Date
}
