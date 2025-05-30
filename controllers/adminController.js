import Order from '../models/Order.js';
import User from '../models/User.js';

export const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
        .populate('rider', 'email role name') 
        .lean();
      res.json({ success: true, orders });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { status, rider } = req.body;
    try {
        console.log("id kya hai",id, req.body)
        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

        if (status) order.status = status;
        if (rider) order.rider = rider;
        
        await order.save();
        res.json({ success: true, message: 'Order updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getRiders = async (req, res) => {
    try {
        const riders = await User.find({ role: 'rider' }).select('email name _id').lean();
        res.json({ success: true, riders });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
