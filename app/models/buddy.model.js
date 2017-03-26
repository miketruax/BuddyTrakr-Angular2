
import mongoose from 'mongoose';

let buddySchema = new mongoose.Schema({
  name: { type : String, required: [true, 'Name required for your buddy!'] },
  species: { type: String, required: [true, 'Species required for your buddy!'] },
  binomial: { type: String},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  description: { type : String },
  timesOut: {type: Number, default: 0},
  checkedOut: {type: Boolean, default: false, set: function(bdy){
    this._prevOut = this.checkedOut;
    return bdy;
  }},
  totalDaysOut: {type: Number, default: 0},
  lastOutDate: {type: Date, default: null},
  lastOutDays: {type: Number, default: 0}
});

buddySchema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});


buddySchema.pre('save', function(next){
  if(this.isModified('checkedOut') && !this.wasNew){
    let now = new Date();
    if(this.checkedOut){
      this.lastOutDate = now;
      return next();
    }
    else if (this.lastOutDate.getDate() === now.getDate()){
      return next();
    }
    else{
      this.lastOutDays = Math.ceil((now-this.lastOutDate)/(1000*60*60*24));
      this.totalDaysOut = this.totalDaysOut + this.lastOutDays;
      this.lastOutDate = now;
      return next();
    }
  }
  else{
    return next();
  }
});

export default mongoose.model('Buddy', buddySchema);
