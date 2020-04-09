const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/api/account', (req, res) => {
    db.select().from('accounts')
        .then(account => {
            res.json(account)
        })
        .catch(err => {
            res.status(500).json({message: 'error retrieving accounts', err})
        })
})

server.post('/api/account', (req, res) => {
    const newAccount = req.body;

    db('accounts')
    .insert(newAccount)
    .then(account => {
        res.status(201).json(account)
    })
    .catch(err => {
        res.status(500).json({message: 'Failed to create new account', err})
    })
})

server.put('/api/account/:id', (req, res) => {
    const { id } = req.params;
    const updatedAccount = req.body;

    db('accounts')
        .where({ id })
        .update(updatedAccount)
        .then(count => {
            if (count) {
                res.json({count})
            } else {
                res.status(404).json({message: 'account not found'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'error updating account', err})
        })
})

server.delete('/api/account/:id', (req, res) => {
    const { id } = req.params;

    db('accounts')
        .where({id})
        .del()
        .then(count => {
            if (count) {
                res.json(count)
            } else {
                res.status(404).json({message: 'account not found'})
            }
        })
        .catch(err => {
            res.status(500).json({message: "error deleting account", err})
        })
})
module.exports = server;
