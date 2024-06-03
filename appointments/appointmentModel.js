import mongoose from "mongoose";

const AppointmentScheme = mongoose.Schema(
    {
        doctor: {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Doctor'
        },
        patient: {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Patient'
        },
        date : {
            type : Date,
            required : true
        },
        slot : {
            type : String,
            required : true
        },
    },
    {
        timestamps : true
    }
)

export const Appointment = mongoose.model('Appointment', AppointmentScheme)