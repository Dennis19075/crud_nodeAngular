const { json } = require('body-parser')
const express =require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const {mongoose} = require('./database')
const routes = require('./routes/employee.routes')

//Settings
app.set('PORT', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'))
app.use(cors({origin: 'http://localhost:4200'}))

app.use(json())
//Routes
app.use('/api/employees/', routes)

//Starting the server


app.listen(app.get('PORT'), () => {
    console.log(`Listen on port ${app.get('PORT')}`);
})