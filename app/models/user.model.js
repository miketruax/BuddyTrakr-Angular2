import mongoose from 'mongoose';

import bcrypt from 'bcrypt-nodejs';

let userSchema = mongoose.Schema({

  local : {

    username : { type : String, unique : true },

    password : String,

    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

    email : { type : String, unique : true }
  },

  role : { type : String }
});

// password Hasher anytime password is changed
userSchema.pre('save', function(next){
  if(!this.isModified('local.password')){
    return next();
  }
    this.local.password = this.generateHash(this.local.password);
  return next();

});

// Generates the hash
userSchema.methods.generateHash = function(password) {

  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Ensures valid password
userSchema.methods.validPassword = function(password) {

  return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.sanitize = function(){
  return {
    _id : this._id,
    username : this.local.username,
    friends : this.local.friends,
    email: this.local.email,
    role: this.role
  }
};

export default mongoose.model('User', userSchema);
