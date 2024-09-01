// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required!"],
    
   
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: [true, "Email already exist!"]
  },
  image: {
    type: String,
    required: true,
  }, 
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
