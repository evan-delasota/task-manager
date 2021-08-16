const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true,
        validate(password) {
            if (password.includes('password')) {
                throw new Error('Password cannot be "password"');
            }
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error('Invalid email address');
            }
        }

    },
    age: {
        type: Number,
        default: 0,
        validate(age) {
            if (age < 0) {
                throw new Error('Invalid age input');
            } 
        }
    }    
});

module.exports = User;