import { IDepartmentDoc } from './department'
import { Document } from 'mongoose'

export interface IMajorDoc extends Document {
  slug: string
  name: string
  department: IDepartmentDoc
  isComingSoon: boolean
}
