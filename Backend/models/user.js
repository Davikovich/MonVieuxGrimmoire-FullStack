const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { 
      type: String,
      required: true,
      unique: true,       
      lowercase: true, 
      trim: true, 
    },
    password: { type: String, required: true }, 
  },
  { timestamps: true } 
);



// (optionnel) masquer le password dans les retours JSON
userSchema.set('toJSON', {
  transform: (_, ret) => { delete ret.password; return ret; }
});

module.exports = mongoose.model('User', userSchema);
