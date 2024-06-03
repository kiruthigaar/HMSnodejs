import express from 'express'
const DoctorRouter = express.Router()
import {Doctor} from './doctorModel.js'
import {Appointment} from '../appointments/appointmentModel.js'

DoctorRouter.get('/', async (request, response) => {
    const doctor = await Doctor.find({})
    response.json(doctor)
})

DoctorRouter.get('/:id', async (request, response) => {
    const {id} = request.params
    const doctor = await Doctor.findById(id)
    response.json(doctor)
})

DoctorRouter.post('/', async (request, response) => {
    await Doctor(request.body).save()
    response.send("posted")
})

DoctorRouter.patch('/:id', async (request, response) => {
    const {id} = request.params
    await Doctor.findByIdAndUpdate(id, request.body)
    response.json("updated")
})

DoctorRouter.delete('/:id', async (request, response) => {
    const {id} = request.params
    await Doctor.findByIdAndDelete(id)
    response.json("deleted")
})


export default DoctorRouter;