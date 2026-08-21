const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({

    company: {
        type: String,
        required: true
    },

    position: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    startDate: {
        type: Date
    },

    endDate: {
        type: Date
    },

    visible: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model("Experience", experienceSchema);