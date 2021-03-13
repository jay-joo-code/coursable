import { Document } from 'mongoose'

export interface IUserDoc extends Document {
  authProvider: 'google'
  providerId?: string
  providerData?: any
}
