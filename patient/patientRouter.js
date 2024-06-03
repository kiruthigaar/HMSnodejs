import express from 'express'
const PatientRouter = express.Router()
import {Patient} from './patientModel.js'
import {Appointment} from '../appointments/appointmentModel.js'
import {Doctor } from '../doctors/doctorModel.js'


PatientRouter.get('/', async (request, response) => {
    const patient = await Patient.find({}) 
    response.json(patient)
})

PatientRouter.get('/:id', async (request, response) => {
    const {id} = request.params
    const patient = await Patient.findById(id) 
    response.json(patient)
})

PatientRouter.post('/', async (request, response) => {
     const lastPatient = await Patient(request.body).save() 
    const patient = await Patient.find({}) 
    response.json(lastPatient)
})

PatientRouter.patch('/:id', async (request, response) => {
    const {id} = request.params
    await Patient.findByIdAndUpdate(id, request.body)
    response.json("updated")
})

PatientRouter.delete('/:id', async (request, response) => {
    const {id} = request.params
    await Patient.findByIdAndDelete(id)
    response.json("deleted")
})

PatientRouter.get('/patientlogin/:id', async (request, response) => {
    const {id} = request.params
    const appointment = await Appointment.find({patient: id})
    // console.log(appointment)

    let patient_details = []
   
    for(let find_doctor of appointment) {
        let a = {}
        let doctor_details = await  Doctor.findById(find_doctor.doctor)

        console.log(doctor_details)

        a.doctorName = doctor_details.name 
        a.doctorDepartment = doctor_details.department 
        a.slot = find_doctor.slot
        a.date = find_doctor.date
        a.consultingFee = doctor_details.consultancy_fee 

        patient_details.push(a)
       
        // let patient = [];

        // for (let x in doctor_details) {
        //     patient.push(doctor_details[x])
        //   }
        // console.log(patient)
        // patient_details.push(patient)
    }
    // console.log(patient_details)
    response.json(patient_details)

})

export default PatientRouter;