const express = require('express');
const router = express.Router();

const listController = require('../controllers/listController');

router.get('/', listController.getLists);

router.post('/', listController.createList);

router.get('/:id', listController.getTasks);

router.post('/:id/tasks', listController.addTask);

router.put('/:listId/tasks/:taskId', listController.toggleTask);

router.delete('/:listId/tasks/:taskId', listController.deleteTask);

module.exports = router;