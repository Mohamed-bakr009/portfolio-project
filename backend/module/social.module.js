const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema({

    platform: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },

    icon: {
        type: String
    },

    visible: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model("Social", socialSchema);