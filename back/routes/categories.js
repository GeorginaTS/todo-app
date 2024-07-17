import express from 'express'

const categoryRouter = express.Router()

import { getAllCategories, createCategory, getOneCategory, deleteOneCategory, updateOneCategory } from '../controllers/categories.js'

categoryRouter.get("/", getAllCategories)
categoryRouter.post("/", createCategory)

categoryRouter.get("/:id", getOneCategory)
categoryRouter.delete("/:id", deleteOneCategory)
categoryRouter.put("/:id", updateOneCategory)

 export default categoryRouter