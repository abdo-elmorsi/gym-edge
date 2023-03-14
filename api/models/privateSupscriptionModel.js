const mongoose = require('mongoose');
const PrivatePackage = require('./privatePackage');

const privateSchema = new mongoose.Schema({
  PrivatePackage: {
    type: mongoose.Schema.ObjectId,
    ref: 'Package',
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: Date,
  trainer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Trainer',
  },
  trainee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

privateSchema.pre(/^find/, function (next) {
  this.populate('trainer')
    .populate('trainee')
    .populate('PrivatePackage');
  next();
});

privateSchema.pre('save', async function (next) {
  const package = await PrivatePackage.findById(this.PrivatePackage);
  const duration = package.duration;
  const date = new Date();
  date.setMonth(this.startDate.getMonth() + duration);
  this.endDate = date;

  next();
});

const Private = mongoose.model('Private', privateSchema);

module.exports = Private;
