import mongoose from "mongoose";

const DepartmentScheme = mongoose.Schema(
    {
        department_name : {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
)
export const Department = mongoose.model('Department', DepartmentScheme)