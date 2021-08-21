const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/userRoutes');
const taskRouter = require('./routers/taskRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

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
    const requestedUpdate = req.body;
    const toBeUpdated = Object.keys(requestedUpdate);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = toBeUpdated.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update' });
    }

    try {
        const task = await Task.findByIdAndUpdate(id, requestedUpdate, { new: true, runValidators: true });

        if (!task) {
            return res.status(404).send();
        } 

        res.send(task);
    } catch (error) {
        res.status(400).send(error):
    }

});

app.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const task = await User.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log('Server is up on port' + port);
});

