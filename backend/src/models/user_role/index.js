const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRoleSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: "User",
    },
    roleId: {
        type: Schema.ObjectId,
        ref: "Role",
    }, 
});

const userRoleModel = mongoose.model("user_role", userRoleSchema);

module.exports = userRoleModel;