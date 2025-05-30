import User from '../models/User.js';
import Order from '../models/Order.js';

export const listRiders = async (req, res) => {
    try {
        const riders = await User.find({ role: 'rider' }).select('email name _id').lean();
        res.json({ success: true, riders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getRiderOrders = async (req, res) => {
    const { email } = req.params;
    try {
        const rider = await User.findOne({ email });
        if (!rider) return res.status(404).json({ success: false, message: 'Rider not found' });
    
        const orders = await Order.find({ rider: rider.email });
        res.json({ success: true, orders });
    } catch (err) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
