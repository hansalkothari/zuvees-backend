import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  selectedColor: { type: String, required: true },
  selectedSize: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 }
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['customer', 'admin', 'rider'], required: true },
  cart: [cartItemSchema]
});

const User = mongoose.model('User', userSchema);

export default User;