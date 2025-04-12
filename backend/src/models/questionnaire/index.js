const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionnareSchema = new Schema({
    questionText: {
        type: String,
        required: true,   //Question is mandatory
    },
    options: {
        type: [String],   //Options array of string
        required: true,
    }, 
});

const questionnareModel = mongoose.model("questionnare", questionnareSchema);

module.exports = questionnareModel;