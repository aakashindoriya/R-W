const validateUser = (req, res, next) => {
    const { email, phone } = req.body;

    // Simple email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ msg: 'Please provide a valid email address' });
    }

    // Simple phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
        return res.status(400).json({ msg: 'Please include a valid 10-digit phone number' });
    }

    next();
};

module.exports = validateUser;
