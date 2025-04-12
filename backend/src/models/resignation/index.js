const mongoose = require('mongoose');
const { format } = require('date-fns');
const Schema = mongoose.Schema;

// Define the Mongoose Schema for Resignation
const resignationSchema = new mongoose.Schema(
  {
    user_id: { 
      type: Schema.ObjectId, 
      required: true, 
      ref: 'user',
    },
    lwd: { 
      type: Date, 
      required: true,
    },  
    approved: { 
      type: Boolean, 
      required: false, 
    }
  },
  {
    timestamps: true,
  }
);


// Method to format resignation date
resignationSchema.methods.getFormattedResignationDate = function () {
  return format(this.lwd, 'dd MMM yyyy'); // Format the resignation date as 'dd MMM yyyy'
};

// Create the model
const Resignation = mongoose.model('resignation', resignationSchema);

module.exports = Resignation;