var express = require('express');
var router = express.Router();

// global variable to hold todolist
// very crude way of doing this
// could make this a session property instead
// or preferably store data in a database
var todolist = [
  {todo: "Feed the cat", done: false},
  {todo: "Do the shopping", done: false},
  {todo: "Water the plants", done: false},
];;   

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/todos/clear', function(req, res) { 
  todolist = [];
  res.status(202);
  res.send(todolist);
})

router.get('/todos', function(req, res) { 
  res.status(200);
  res.send(todolist);
})

router.get('/todos/:term', function(req, res) { 
  var selectedtodos = todolist.filter(function(todo) {
    return todo.todo.search(req.params["term"])>=0;
  });
  res.status(200);
  res.send(selectedtodos);
})

router.post('/todos/add', function(req, res) { 
  newtodo = req.body;
  todolist.push(newtodo);
  res.status(201);
  res.send(newtodo);
})

router.post('/todos/setdone', function(req, res) { 
  tosetdone = req.body;
  for(index of tosetdone){
    todolist[index].done=true;
  }
  res.status(202);
  res.send(todolist);
})

module.exports = router;
