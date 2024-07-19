import express from 'express'

const todosRouter = express.Router()
import {getAllTodos, getOneTodo, createTodo, deleteOneTodo, updateOneTodo, updateStatusTodo} from "../controllers/todos.js"
import { validatorTodo } from '../validators/todos.js'

todosRouter.get("/", getAllTodos)
todosRouter.post("/", validatorTodo, createTodo)

todosRouter.get("/:id", getOneTodo)
todosRouter.delete("/:id", deleteOneTodo)
todosRouter.put("/:id", validatorTodo, updateOneTodo)
todosRouter.patch("/:id", updateStatusTodo)

 export default todosRouter