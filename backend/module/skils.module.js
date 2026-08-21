const mongooes =require('mongoose')
const skillsScheam = new mongooes.Schema({

 name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    icon: {
        type: String
    },

    visible: {
        type: Boolean,
        default: true
    },

    showInTechStrip: {
        type: Boolean,
        default: true
    }
  

})
module.exports =mongooes.model("skills",skillsScheam)
