const mongoose = require("mongoose")
const TodoSchema  = new mongoose.Schema({
    inputDiscription:{
        type : String,
        required:true
    },
    catagory:{
        type:String,
        required:true
    },
    duedate:{
        type:String,
        required:true
    }
})

const toDoModel = mongoose.model("toDoModel",TodoSchema)
module.exports = toDoModel