const lists = require('../models/data');

exports.getLists = (req, res) => {
  res.render('lists', { lists });
};

exports.createList = (req, res) => {
  const { name } = req.body;

  const newList = {
    id: Date.now(),
    name,
    tasks: []
  };

  lists.push(newList);

  res.redirect('/app');
};

exports.getTasks = (req, res) => {
  const list = lists.find(l => l.id == req.params.id);

  if (!list) {
    return res.send('Lista não encontrada');
  }

  res.render('tasks', { list });
};

exports.addTask = (req, res) => {
  const list = lists.find(l => l.id == req.params.id);

  if (!list) {
    return res.send('Lista não encontrada');
  }

  list.tasks.push({
    id: Date.now(),
    title: req.body.title,
    completed: false
  });

  res.redirect(`/app/${list.id}`);
};

exports.toggleTask = (req, res) => {
  const list = lists.find(l => l.id == req.params.listId);

  if (!list) {
    return res.send('Lista não encontrada');
  }

  const task = list.tasks.find(t => t.id == req.params.taskId);

  if (!task) {
    return res.send('Tarefa não encontrada');
  }

  task.completed = !task.completed;

  res.redirect(`/app/${list.id}`);
};

exports.deleteTask = (req, res) => {
  const list = lists.find(l => l.id == req.params.listId);

  if (!list) {
    return res.send('Lista não encontrada');
  }

  list.tasks = list.tasks.filter(
    task => task.id != req.params.taskId
  );

  res.redirect(`/app/${list.id}`);
};

exports.editList = (req, res) => {

  const list = lists.find(l => l.id == req.params.id);

  if (!list) {
    return res.send('Lista não encontrada');
  }

  list.name = req.body.name;

  res.redirect('/app');
};

exports.deleteList = (req, res) => {

  const index = lists.findIndex(
    l => l.id == req.params.id
  );

  if (index === -1) {
    return res.send('Lista não encontrada');
  }

  lists.splice(index, 1);

  res.redirect('/app');
};