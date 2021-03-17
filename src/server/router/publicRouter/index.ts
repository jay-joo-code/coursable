import express from 'express'
import requirementRouter from './requirementRouter'
import planRouter from './planRouter'
import majorRouter from './majorRouter'
import templateRouter from './templateRouter'
import departmentRouter from './departmentRouter'
import courseRouter from './courseRouter'
import authRouter from './authRouter'

const publicRouter = express.Router()

publicRouter.use('/requirement', requirementRouter)
publicRouter.use('/plan', planRouter)
publicRouter.use('/major', majorRouter)
publicRouter.use('/template', templateRouter)
publicRouter.use('/department', departmentRouter)
publicRouter.use('/course', courseRouter)
publicRouter.use('/auth', authRouter)

export default publicRouter
