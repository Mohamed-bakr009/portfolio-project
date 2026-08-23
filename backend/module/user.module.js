const mongooes=require('mongoose')
const userSceam = new mongooes.Schema({

   username: {
    type: String,
    required: true,
    trim: true
},

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

  isBackup: { 
    type: Boolean, default: false
 },


},{timestamps:true})

module.exports=mongooes.model("Users",userSceam)
