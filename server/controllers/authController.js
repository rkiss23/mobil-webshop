const User = require('../models/user');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const register = async (req, res) => {
  try {
      const { username, password, email, firstName, lastName } = req.body;
      
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const newUser = new User({
          username,
          password: hashedPassword,
          email,
          firstName,
          lastName,
          isAdmin: false 
      });

      await newUser.save();
     
      res.status(201).json('User registered successfully');
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json('Error registering user');
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

   
    const isAdmin = user.isAdmin || false;
    res.json({ message: 'Login successful', token: 'dummy-jwt-token', isAdmin });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
};


module.exports = { register, login };
