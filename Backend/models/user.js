const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,       // <-- garde uniquement ça
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// ❌ NE PAS garder de userSchema.index({ email: 1 }, { unique: true })

// (optionnel) masquer le password dans les retours JSON
userSchema.set('toJSON', {
  transform: (_, ret) => { delete ret.password; return ret; }
});

module.exports = mongoose.model('User', userSchema);
