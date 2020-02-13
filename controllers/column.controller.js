const createError = require('http-errors');
const mongoose = require('mongoose');
const Column = require('../model/column.model')
const Card = require('../model/card.model')

module.exports.getAll = ( req, res, next ) => {
    Column.find()
        .populate('cards')
        .then(data => res.json(data))
        .catch(next)
}

module.exports.create = ( req, res, next ) => {
    
    const col = new Column(req.body)
    col.save()
        .then(data => res.status(201).json(data))
        .catch(next)
}

module.exports.getSingle = ( req, res, next ) => {

    Column.findById(req.params.id)
        .populate('cards')
        .then(data => res.json(data))
        .catch(next)
}


module.exports.update = ( req, res, next ) => {

    Column.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then( data => {
            if (!data) {
                throw createError(404, 'Requested column was not found')
            } else {
                res.json(data)
            }
        })
        .catch(next)
}

module.exports.delete = ( req, res, next ) => {

    Promise.all([
        Column.findByIdAndDelete(req.params.id),
        Card.deleteMany({colum: req.params.id})
    ])
    .then( (col, card) => {
        
        if (!col) {
            throw createError(404, 'Requested column was not found')
        } else {
            res.status(201).json();
        }
        
    })
    .catch(next)
}