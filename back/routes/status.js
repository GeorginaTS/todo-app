import express from 'express'

const statusRouter = express.Router()

import { getAllStatus, createStatus, getOneStatus, deleteOneStatus, updateOneStatus } from '../controllers/status.js'

statusRouter.get("/", getAllStatus)
statusRouter.post("/", createStatus)

statusRouter.get("/:id", getOneStatus)
statusRouter.delete("/:id", deleteOneStatus)
statusRouter.put("/:id", updateOneStatus)

 export default statusRouter