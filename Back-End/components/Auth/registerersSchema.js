const Joi = require('joi');
const mongoose = require('mongoose');

const registererSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      unique: true,
      maxlength: 255
    },
    birthdate: {
      type: Date,
      required: true
    },
    otp:{
        type: Number,
        required: true,
        min: 100000,
        max: 999999  
    },
    confirmedEmail:{
      type:Boolean,
      default: false
    },
    password: { 
      type: String ,
      minlength: 5,
      maxlength: 1024
    },
    passwordSet:{
      type:Boolean,
      default: false
    },
    username: {
      type: String,
      minlength: 5,
      maxlength: 50,
      unique: true
    },
  },{ timestamps:true });
  
registererSchema.index( {createdAt: 1} ,{expireAfterSeconds: 3600});

const Registerer = mongoose.model('Registerer', registererSchema );


function validateRegisterer(Registerer) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      birthdate: Joi.date().required()  
    };
  
    return Joi.validate(Registerer, schema);
  }
  
  exports.Registerer = Registerer; 
  exports.validateRegisterer = validateRegisterer;