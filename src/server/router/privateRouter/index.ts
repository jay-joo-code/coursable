import express from 'express'
import passport from 'passport'
import taskRouter from './taskRouter'
import userRouter from './userRouter'

const privateRouter = express.Router()

// authorization
privateRouter.use(passport.authenticate('jwt', { session: false }))

privateRouter.use('/task', taskRouter)
privateRouter.use('/user', userRouter)

export default privateRouter
