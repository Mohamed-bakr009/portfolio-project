const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({

    fileName: {
        type: String,
        required: true
    },

    filePath: {
        type: String,
        required: true
    },


    parsedData: {
        summary: { type: String, default: "" },
        projects: { type: [mongoose.Schema.Types.Mixed], default: [] },
        education: { type: [mongoose.Schema.Types.Mixed], default: [] },
        training: { type: [mongoose.Schema.Types.Mixed], default: [] },
        experience: { type: [mongoose.Schema.Types.Mixed], default: [] },
        techSkills: { type: [String], default: [] },
        softSkills: { type: [String], default: [] },
        languages: { type: [mongoose.Schema.Types.Mixed], default: [] },
    },

    visible: {
        type: Boolean,
        default: true
    },

    deleted: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model("CV", cvSchema);