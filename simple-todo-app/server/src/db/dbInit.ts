require('dotenv').config()

import { Task } from './models'

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV !== 'test'

const dbInit = () => Promise.all([
    Task.sync({ alter: isDev || isTest }),
  ])

export default dbInit 