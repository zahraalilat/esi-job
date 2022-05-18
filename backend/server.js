const express = require('express')

const app = express()

// body parser
app.use(express.json())

// dotenv configuration
require('dotenv').config()

// general exports
require('colors')
const morgan = require('morgan')
const connectDB = require('./db')
const errorHandler = require('./middlewares/errorMiddleware')

// route exorts
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const convoRoutes = require('./routes/convoRoutes')
const offerRoutes = require('./routes/offerRoutes')
const trainingRoutes = require('./routes/trainingRoutes')
const internshipRoutes = require('./routes/internshipRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

// http logger
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// main routes
app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/convos', convoRoutes)
app.use('/api/offers', offerRoutes)
app.use('/api/trainings', trainingRoutes)
app.use('/api/internships', internshipRoutes)
app.use('/api/upload', uploadRoutes)

// make upload folder static
app.use('/uploads', express.static('uploads'))
 
// error handling
app.use(errorHandler)

// set db connection
const PORT = process.env.PORT || 5000

const start = async() => {
    try {
        const conn = await connectDB(process.env.MONGO_URI)
        console.log(`MongoDB connected successfully ${conn.connection.host}`.cyan.bold.underline);
        app.listen(PORT, () => {
            console.log(`server listening on port ${process.env.PORT} in ${process.env.ENV_MODE} mode`.yellow.bold)
        })
    } catch (error) {
        console.log(`Error: ${error}`.red.bold.underline)
        process.exit(1)
    }
}

start()