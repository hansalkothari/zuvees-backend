import mongoose from 'mongoose';

const orderProductSchema = new mongoose.Schema({
  productId: Number,
  name: String,
  selectedColor: String,
  selectedSize: String,
  quantity: Number,
  price: Number,
});

const orderSchema = new mongoose.Schema({
  customerEmail: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  products: [orderProductSchema],
  status: { type: String, enum: ['ordered', 'placed and paid', 'shipped', 'delivered', 'undelivered'], default: 'ordered' },
  rider: { type: String, default:'unassigned'},
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
