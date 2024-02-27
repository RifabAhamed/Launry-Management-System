const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    name:{type: String, require:true},
    nic:{type:String, require:true,unique:true},
    address:{type:String},
    phoneNo:{type:Number,require:true},
    age:{type:Number,require:true},
    sex:{type:String,require:true}
})

const employeeCollection = mongoose.model("employee",employeeSchema)

module.exports = employeeCollection;