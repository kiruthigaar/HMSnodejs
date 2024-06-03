import express, {json, urlencoded } from 'express'
import { config } from "dotenv";
import { connect, set } from "mongoose";
import cors from 'cors'
import DoctorRouter from './doctors/doctorRouter.js'
import DepartmentRouter from './departments/departmentRouter.js'
import PatientRouter from './patient/patientRouter.js'
import AppointmentRouter from './appointments/appointmentRouter.js'
import AdminRouter from './adminLogin/adminRouter.js'

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    method: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))
app.use(json()) 
app.use(urlencoded({extended : true}))
config()
set('strictQuery', false)

app.use('/doctor/', DoctorRouter)
app.use('/department/', DepartmentRouter)
app.use('/patient/', PatientRouter)
app.use('/appointment/', AppointmentRouter)
app.use('/admin/', AdminRouter)

const PORT = process.env.PORT
const mongodb_connection = process.env.connection_string

const start = async () => {
    await connect(`${mongodb_connection}`),
    app.listen(PORT, () => console.log("server is running on the port 2000"))
}
start()