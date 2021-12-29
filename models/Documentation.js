let mongoose = require("mongoose");

const docSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    desc: {
        type: String
    },
    section : {
        type : [{
            title: String, 
            method: String,
            content: String,
        }]
    }
}, {
    timestamps: true
})

const docsModel = mongoose.model('doc', docSchema);
module.exports = docsModel;