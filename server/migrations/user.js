const User = require('../models/user');

const usersArray = [
  {
    username: 'admin',
    password: 'hashed_password1',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    isAdmin: true
  },
  {
    username: 'regularUser',
    password: 'hashed_password2',
    email: 'user@example.com',
    firstName: 'Regular',
    lastName: 'User',
    isAdmin: false
  }
];

async function createAndSaveUser() {
  try {
    for (const userData of usersArray) {
      const existingUser = await User.findOne({ username: userData.username });
      if (existingUser) {
        console.log(`User "${userData.username}" already exists, not inserting again.`);
        continue;
      }
      const newUser = new User(userData);
      await newUser.save();
      console.log(`User "${userData.username}" saved!`);
    }
  } catch (err) {
    console.error('Error saving user:', err);
  }
}

module.exports = createAndSaveUser;