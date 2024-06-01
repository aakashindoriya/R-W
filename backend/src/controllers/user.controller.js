const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.registerUser = async (req, res) => {
    const { name, email, password, phone, gender } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        const hashedPassword = await argon2.hash(password);

        user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            gender
        });


       const token=await jwt.sign({id:user._id},
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
        );
       res.status(201).send(token)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// User Login Controller
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token=await jwt.sign({id:user._id},
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
        );
       res.status(200).send(token)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};