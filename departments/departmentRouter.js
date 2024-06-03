import express from 'express'
const DepartmentRouter = express.Router()
import {Department} from './departmentModel.js'
import {Doctor} from '../doctors/doctorModel.js'


DepartmentRouter.get('/', async (request, response) => {
    const department = await Department.find({})
    response.json(department)
})

DepartmentRouter.get('/:id', async (request, response) => {
    const {id} = request.params
    const department = await Department.findById(id)
    response.json(department)
})

DepartmentRouter.post('/', async (request, response) => {
    await Department(request.body).save()
    response.send("posted")
})

DepartmentRouter.patch('/:id', async (request, response) => {
    const {id} = request.params
    await Department.findByIdAndUpdate(id, request.body)
    response.json("updated")
})

DepartmentRouter.delete('/:id', async (request, response) => {
    const {id} = request.params
    await Department.findByIdAndDelete(id)
    response.json("deleted")
})


export default DepartmentRouter;