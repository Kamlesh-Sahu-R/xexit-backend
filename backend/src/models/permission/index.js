const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
  
    subject: { type: String },
    action: { type: String },
    
});

const permissionModel = mongoose.model("permission", permissionSchema);

module.exports = permissionModel;