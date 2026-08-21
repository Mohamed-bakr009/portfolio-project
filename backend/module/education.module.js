const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({

    institution: {
        type: String,
        required: true
    },

    degree: {
        type: String,
        required: true
    },

    field: {
        type: String,
        required: true
    },

    startYear: {
        type: Number
    },

    endYear: {
        type: Number
    },

    description: {
        type: String
    },

    visible: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model("Education", educationSchema);

 