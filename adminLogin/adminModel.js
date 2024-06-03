import mongoose from "mongoose";

const AdminScheme = mongoose.Schema(
    {
        user_name : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
)

export const Admin = mongoose.model('Admin', AdminScheme)

const RefreshTokenSchema = mongoose.Schema(
    {
        refresh_token: {
            type: String,
            required: true
        }
    }
)

export const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema)