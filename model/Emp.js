const mongoose = require("mongoose")

const EmpSchema = mongoose.Schema({

    name:{
        type:String,
        required:[true,"Name Field is Mandatory"]
    },
    email:{
        type:String,
        required:[true,"Email Field is Mandatory"]

    },
    phone:{
        type:Number,
        required:[true,"Phone Field is Mandatory"]

    },
    dsg:{
        type:String,
        required:[true,"Designation Field is Mandatory"]

    },
    salary:{
        type:Number,
        required:[true,"Salary Field is Mandatory"]

    },
    city:{
        type:String

    },
    state:{
        type:String

    }
})

const Emp = new mongoose.model("Emp",EmpSchema)

module.exports = Emp
