const createError = require('http-errors');
const mongoose = require('mongoose');
const Card = require('../model/card.model')


module.exports.getAll = ( req, res, next ) => {
    Card.find()
        .then(data => res.json(data))
        .catch(next)
}

module.exports.create = ( req, res, next ) => {
    
    const col = new Card(req.body)
    col.save()
        .then(data => res.status(201).json(data))
        .catch(next)
}

module.exports.getSingle = ( req, res, next ) => {

    Card.findById(req.params.id)
        .then(data => res.json(data))
        .catch(next)
}


module.exports.update = ( req, res, next ) => {

    Card.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then( data => {
            if (!data) {
                throw createError(404, 'Requested card was not found')
            } else {
                res.json(data)
            }
        })
        .catch(next)
}

module.exports.delete = ( req, res, next ) => {

    Card.findByIdAndDelete(req.params.id)
    .then( (card) => {
        if (!card) {
            throw createError(404, 'Card not found')
        } else {
            res.status(201).json();
        }
    })
    .catch(next)
}