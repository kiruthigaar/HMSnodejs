import mongoose from 'mongoose'

const DoctorScheme = mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        gender : {
            type : String,
            required : true
        },
        qualification : {
            type : String,
            required : true
        },
        department : {
            type : String,
            required : true
        },
        experience: {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        contact : {
            type : Number,
            required : true
        },
        consultancy_fee : {
            type : Number,
            required : true
        }
        
    },
    {
        timestamps : true
    }
)

export const Doctor = mongoose.model('Doctor', DoctorScheme)