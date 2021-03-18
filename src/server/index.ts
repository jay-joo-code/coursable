
import bodyParser from 'body-parser'
import compression from 'compression'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import morgan from 'morgan'
import passport from 'passport'
import PassportJwt from 'passport-jwt'
import DBConnect from './dbConfigs'
import User from './models/User'
import router from './router'
import testScript from './testScript'
import { IUserDoc } from './types/user'

// env variables
dotenv.config()

const app: Express = express()

// middlewares
app.use(morgan('dev'))
app.set('trust proxy', 1)
app.use(cookieParser())
app.use(cors())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// passport
declare global {
  namespace Express {
      interface User extends IUserDoc {}
  }
}

app.use(passport.initialize())
const { Strategy: JwtStrategy, ExtractJwt } = PassportJwt
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.AUTH_SECRET,
}
passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
  User.findById(jwtPayload._id, (err, user: IUserDoc) => {
    if (err) {
      return done(err, false)
    }
    if (user) {
      return done(null, user)
    }
    return done(null, false)
  })
}))

// database
DBConnect.dbConnection()

// routing
app.use('/api', router)

// prod
if (process.env.NODE_ENV !== 'development') {
  app.use(express.static('dist'))
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '/../dist/index.html'))
  })
}

// listen at port
const port: number = Number(process.env.PORT) || 5000
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Listening on port: ${port}`)
})

testScript()
