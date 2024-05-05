const bcrypt = require('bcrypt');
const User = require('../models/user');


const SALT_ROUNDS = 10;

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
};

const addUser = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName} = req.body;

    
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
    res.json('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Error adding user');
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, username, password, email, firstName, lastName, isAdmin } = req.body;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    if (password) {
      user.password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    user.username = username;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.isAdmin = isAdmin;

    await user.save();

    res.json('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.query.id });

    if (result.deletedCount === 0) {
      return res.status(404).send('User not found');
    }

    res.json('Deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Error deleting user');
  }
};

module.exports = { 
    getUsers,
    addUser,
    updateUser,
    deleteUser
};
