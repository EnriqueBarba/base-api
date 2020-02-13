const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const cardController = require('../controllers/card.controller');
const columnController = require('../controllers/column.controller');

// Base
router.get('/', controller.base);

// Column
router.get('/columns', columnController.getAll)
router.post('/columns', columnController.create)
router.get('/columns/:id', columnController.getSingle)
router.patch('/columns/:id', columnController.update)
router.delete('/columns/:id', columnController.delete)

// Cards

router.get('/cards', cardController.getAll)
router.post('/cards', cardController.create)
router.get('/cards/:id', cardController.getSingle)
router.patch('/cards/:id', cardController.update)
router.delete('/cards/:id', cardController.delete)

module.exports = router;