const mongoose = require('mongoose')
const projectSceam = new mongoose.Schema({


    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String
    },

    technologies: {
        type: [String]
    },

    githubUrl: {
        type: String
    },

    liveUrl: {
        type: String
    },

    category: {
        type: String
    },


    visible: {
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model("Project", projectSceam);