const mongoose = require('mongoose');

const getResignationSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  lwd: {
    type: String, 
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'], // Assuming possible statuses
    default: 'pending',
  },
}, { timestamps: true }); 


const getResignationModel = mongoose.model('GetResignation', getResignationSchema);

module.exports = getResignationModel;
