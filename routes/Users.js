const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }

    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                    User.create(userData)
                        .then(user => {
                            res.json({ status: user.email + 'Registered!' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (req.body.password == user.password) {
                    // Passwords match
                    const payload = {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    // Passwords don't match
                    res.json({ error: 'User does not exist' })
                }
            } else {
                res.json({ error: 'User does not exist' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.get('/profile', (req, res) => {
   // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.find({
      //  _id: decoded._id
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.delete('/delete/:id', async(req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);

    res.json('Usuario Eliminado');

})

users.put('/actualizar/:id',async(req, res) =>{
    const {first_name, last_name, email, password} = req.body;
    const {id}= req.params;
    await User.findByIdAndUpdate({_id: id}, {first_name, last_name, email, password});
    res.json("Usuario actualizado")
})

users.get('/oneUser/:id', async (req, res) => {
    const { id } = req.params;
    User.findById(id).then( user => {
        res.json(user);
    })
    
});

module.exports = users