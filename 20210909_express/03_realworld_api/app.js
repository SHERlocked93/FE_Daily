import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import errorHandler from './middleware/error-handler.js'

import router from './router/index.js'

const app = express()

const PORT = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/api', router)

app.use(errorHandler())

app.listen(PORT, () => console.log('server is running at http://localhost:' + PORT))

