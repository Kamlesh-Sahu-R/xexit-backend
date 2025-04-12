const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: ["admin", "manager", "employee", "intern"], // Define possible roles
    },
});

const roleModel = mongoose.model("role", roleSchema);

module.exports = roleModel;