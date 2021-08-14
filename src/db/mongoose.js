const mongoose = require('mongoose');
const validator = require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
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

// const user = new User({
//     name: 'Evan',
//     password: 'fesr5ga5hj6j5       ',
//     email: 'evan@evand.com',
//     age: 26 
// })
// user.save().then(() => {
//     console.log(user);
// }).catch((error) => {
//     console.log(error);
// });

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const task = new Task({
    description: 'clean room',
    completed: false
});

task.save().then(() =>{
    console.log(task);
}).catch((error) => {
    console.log(error);
});