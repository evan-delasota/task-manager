const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// User CRUD methods
//
app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
    
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});

        res.status(202).send(users);
    } catch (error) {
        res.status(500).send(error);
    }

});

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send();
        }

        res.status(202).send(user);
    } catch (error) {
        res.status(500).send(error);
    }

});

app.patch('/users/:id', async (req, res) => {
    const id = req.params.id;
    const toBeUpdated = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, toBeUpdated, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send();
        }
        
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})
// Task CRUD methods
//
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.send(201).send(task);
    } catch (error) {
        res.send(400).send(error);
    }

});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = User.find({});

        res.status(202).send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }

});

app.get('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        const task = User.findById(id);

        if (!task) {
            return res.status(404).send();
        }

        res.status(202).send(task);
    } catch (error) {
        res.status(500).send(error);
    }

});

app.patch('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    const toBeUpdated = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, toBeUpdated, { new: true, runValidators: true });
        
        if (!task) {
            return res.status(404).send();
        } 

        res.send(task);
    } catch (error) {
        res.status(400).send(error):
    }
});

app.listen(port, () => {
    console.log('Server is up on port' + port);
});

