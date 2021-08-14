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
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Password cannot be "password"');
            }
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email address');
            }
        }

    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (!validator.isInt(value) || value < 0) {
                throw new Error('Invalid age input');
            } 
        }
    }    
});
const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
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