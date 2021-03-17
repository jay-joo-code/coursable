import express, { Router } from 'express'
import privateRouter from './privateRouter'
import publicRouter from './publicRouter'
// import middleware from '../middlewares'

const router: Router = express.Router()

// router.use(Object.values(middleware))

router.use('/public', publicRouter)
router.use('/private', privateRouter)

router.get('/ping', (req, res) => {
  try {
    res.send('pong')
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
