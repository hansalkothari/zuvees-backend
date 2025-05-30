import User from '../models/User.js';

export const addToCart = async (req, res) => {
    const { email, productId, selectedColor, selectedSize, quantity } = req.body;
    try {
        let user = await User.findOne({ email });
        console.log(" request body: ", req.body);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const existingItem = user.cart.find(item =>
            item.productId.toString() === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            user.cart.push({ productId, selectedColor, selectedSize, quantity });
        }

        await user.save();
        res.json({ success: true, message: 'Item added to cart' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getCart = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.json({ cart: user.cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
