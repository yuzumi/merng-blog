const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validateRegisterInput, validateLoginInput } = require('../../validators');
const User = require('../../models/user');

const generateToken = user => 
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    }, 
    'some very secret key', 
    { expiresIn: '1h' }
);

const users = {
  Mutation: {
    async register(_parent, args, _context, _info) {
      const {
        email, 
        username, 
        password, 
        confirmPassword
      } = args.registerInput;

      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError('Error', { errors });
      }

      const user = await User.findOne({ username });

      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken'
          }
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password: hashedPassword
      });

      const savedUser = await newUser.save();
      
      const token = generateToken(savedUser);

      return {
        ...savedUser._doc,
        id: savedUser.id,
        token
      };
    },
    async login(_parent, args, _context, _info) {
      const { username, password } = args;

      const { valid, errors } = validateLoginInput(username, password);
    
      if (!valid) {
        throw new UserInputError('Error', { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        throw new UserInputError('User not found', {
          errors: {
            general: 'User not found'
          }
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new UserInputError('Wrong credentials', {
          errors: {
            general: 'Wrong credentials'
          }
        });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user.id,
        token
      };
    }
  }
};

module.exports = users;
