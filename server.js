require("dotenv").config() // load .env variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const {log} = require("mercedlogger") // import mercedlogger's log function
const cors = require("cors") // import cors
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const UserRouters = require("./controllers/User")
const VerifyToken = require("./app")

const {PORT = 3000} = process.env

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

// app.use(cors())

app.use(morgan("tiny")) // log the request for debugging
app.use(express.json()) // parse json bodies
app.use(cookieParser());


app.get("/", VerifyToken,(req, res) => {
    let t =0 ;
    res.status(200).json({ message: 'Welcome to the protected route',tokenValid: true });
})
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message:'Logged out'});
  });
app.use('/user',UserRouters)

app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`))
