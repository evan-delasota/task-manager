const express = require('express');
const User = require('../models/user');
const router = new express.Router();
//
// User CRUD methods
//
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
    
});

router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        res.send(user);
    } catch (error) {
        res.status(400).send();
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});

        res.status(202).send(users);
    } catch (error) {
        res.status(500).send(error);
    }

});

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
    const id = req.params.id;
    const requestedUpdate = req.body;
    const toBeUpdated = Object.keys(requestedUpdate);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = toBeUpdated.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update' });
    }

    try {
        const user = await User.findById(id);

        toBeUpdated.forEach((update) => {
            user[update] = requestedUpdate[update];
        });
        await user.save();
        
        if (!user) {
            return res.status(404).send();
        }
        
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = userRoutes