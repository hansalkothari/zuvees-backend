import User from '../models/User.js';
import Order from '../models/Order.js';
import { products } from '../constants/index.js';

export const createOrder = async (req, res) => {
    const { email, address, contactNumber } = req.body;

    if (!email || !address || !contactNumber)
      return res.status(400).json({ success: false, message: 'Email, address, and contact number are required.' });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        if (user.cart.length === 0) return res.status(400).json({ success: false, message: 'Cart is empty' });

        const placedOrders = [];

        for (const item of user.cart) {
          const product = products.find(p => p.id === item.productId) || {};

          const newOrder = new Order({
              customerEmail: email,
              address,
              contactNumber,
              products: [
                {
                  productId: item.productId,
                  name: product.name || 'Unknown Product',
                  selectedColor: item.selectedColor,
                  selectedSize: item.selectedSize,
                  quantity: item.quantity,
                  price: product.price || 0,
                },
              ],
          });

          await newOrder.save();
          placedOrders.push(newOrder);
        }

        user.cart = [];
        await user.save();

        res.json({ success: true, message: 'Orders placed successfully', orders: placedOrders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
