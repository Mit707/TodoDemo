import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [deleteId, setdeleteId] = React.useState('');

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    setOpen(true);
    setdeleteId(id);
  };
  const handleClose = flag => {
    if (flag) {
      const removedArr = [...todos].filter(todo => todo.id !== deleteId);

      setTodos(removedArr);
      setdeleteId('');
    }
    setOpen(false);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>Manage Task</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      <div>
        <Dialog
          open={open}
          //TransitionComponent={Transition}
          keepMounted
          onClose={() => handleClose(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Alert</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to delete task?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(false)} color="primary">
              No
          </Button>
            <Button onClick={() => handleClose(true)} color="primary">
              Yes
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default TodoList;
