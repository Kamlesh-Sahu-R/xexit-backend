const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rolePermissionSchema = new mongoose.Schema({
    roleId: {
        type: Schema.ObjectId,
        ref: "User",
    },
    permissionId: {
        type: Schema.ObjectId,
        ref: "Role",
    }, 
});

const rolePermissionModel = mongoose.model("role_permission", rolePermissionSchema);

module.exports = rolePermissionModel;