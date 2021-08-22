const express = require('express');
const Task = require('../models/task');
const router = new express.Router();
//
// Task CRUD methods
//
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.send(201).send(task);
    } catch (error) {
        res.send(400).send(error);
    }

});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = User.find({});

        res.status(202).send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }

});

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
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
        const task = await Task.findById(id);

        toBeUpdated.forEach((update) => {
            task[update] = requestedUpdate[update];
        });
        await task.save();

        if (!task) {
            return res.status(404).send();
        } 

        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }

});

router.delete('/tasks/:id', async (req, res) => {
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

module.exports = taskRoutes