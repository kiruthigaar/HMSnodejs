import mongoose from 'mongoose'

const PatientScheme = mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        gender : {
            type : String,
            required : true
        },
        mobile : {
            type : Number,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        address: {
            type : String,
            required : true
        },
        DOB : {
            type : Date,
            required : true
        },
        blood_group : {
            type : String,
            required : true
        }
        
    },
    {
        timestamps : true
    }
)

export const Patient = mongoose.model('Patient', PatientScheme)