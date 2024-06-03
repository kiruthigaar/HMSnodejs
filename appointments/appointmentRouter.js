import express from 'express'
const AppointmentRouter = express.Router()
import {Appointment} from './appointmentModel.js'
import {Doctor} from '../doctors/doctorModel.js'
import { Patient } from '../patient/patientModel.js'


AppointmentRouter.get('/', async (request,response) => {
    const appointment = await Appointment.find({})
    response.json(appointment)
})

AppointmentRouter.get('/doctor/:id', async (request,response) => {
    const {id} = request.params
    const appointment = await Appointment.find({doctor : id})
    response.json(appointment)
})

AppointmentRouter.post('/', async (request,response) => {
    await Appointment(request.body).save()
    response.send("posted")
})

AppointmentRouter.delete('/:id', async (request,response) => {
    const {id} = request.params
    await Appointment.findByIdAndDelete(id)
    response.json("deleted")
})

AppointmentRouter.post('/patientdetails/', async (request,response) => {
    const {selectedDoctor } = request.body

    const doctordetails = await Doctor.find({name : selectedDoctor})

    console.log(doctordetails)

    const appointments = await Appointment.find({doctor  : doctordetails[0]._id})

    console.log(appointments)

    const patientArray = []

    for(let appointment of appointments){

        let patientObj = {}
        const patientDetails = await Patient.findById(appointment.patient)

        console.log(patientDetails)
        patientObj.name = patientDetails.name
        patientObj.slot = appointment.slot
        patientObj.date = appointment.date

        patientArray.push(patientObj)

    }
    console.log(patientArray)
    response.json(patientArray)
})

AppointmentRouter.post('/initialDetails/', async (request, response) => {
        const {today} = request.body

        const patientDetails = await Appointment.find({date : today})
        console.log(patientDetails)

        const todayPatient = []

        for(let details of patientDetails){
            let a ={}
            const patient = await Patient.findById(details.patient)
            console.log(patient)
            a.name = patient.name
            a.date = details.date
            a.slot = details.slot

            todayPatient.push(a)
        }
        response.json(todayPatient)
})

AppointmentRouter.get('/:id/', async(request , response) => {
    
    const {id} = request.params

    const final_array =[]
   
    const appointment_info = await Appointment.find({doctor:id})

    for(let app of appointment_info){
        const patientdetails = await Patient.findById(app.patient)
        console.log(patientdetails);
        
        const final_data = {

            patientName : patientdetails.name,
            date : app.date,
            slot : app.slot
        }
           
        final_array.push(final_data)

    }
    response.json(final_array)
    
})
export default AppointmentRouter;