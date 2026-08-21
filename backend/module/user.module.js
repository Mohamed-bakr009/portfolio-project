const mongooes=require('mongoose')
const userSceam = new mongooes.Schema({

   
    email:{
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password :{
        type: String,
        required: true
    },

  


},{timestamps:true})

module.exports=mongooes.model("Users",userSceam)
