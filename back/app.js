import express from 'express'
import dbConnect from './config/mongo.js'
import usersRouter from "./routes/users.js"
import todosRouter from './routes/todos.js' 
import categoriesRouter from './routes/categories.js' 
import statusRouter from './routes/status.js'
import {authenticateToken} from "./validators/users.js"

import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3401

app.get('/', (request, response) => {
    response.send(`<h1> Bon dia 😊 Listening on port ${port} </h1>`)
})

app.use("/api/users", usersRouter)
app.use("/api/todos", authenticateToken, todosRouter)
app.use("/api/categories", categoriesRouter)
app.use("/api/status", statusRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

dbConnect()