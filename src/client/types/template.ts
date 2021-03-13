import { Document } from 'mongoose'
import { IMajorDoc } from './major'

export interface ITemplateDoc extends Document {
  majorId: string
  major: IMajorDoc
  semesters: string[][]
}
