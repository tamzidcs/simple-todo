require('dotenv').config()

import { Todo } from './models'

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV !== 'test'

const dbInit = () => Promise.all([
    Todo.sync({ alter: isDev || isTest }),
  ])

export default dbInit 