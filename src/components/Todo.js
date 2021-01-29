import React, { useState } from 'react';
import TodoForm from './TodoForm';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import moment from 'moment';


const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
      status: 'Active',
      date: new Date()
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }


  return todos.map((todo, index) => (
    <>
      <div
        className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
        key={index}
      >
        <div key={todo.id} onClick={() => completeTodo(todo.id)}>
          {todo.text} - {todo.status} - {moment(todo.date).format("DD-MM-YYYY")}
        </div>
        <div className='icons' key={index + 1}>
          <EditIcon onClick={() => setEdit({ id: todo.id, value: todo.text, date: todo.date, status: todo.status })}
            className='edit-icon' />
          <CancelIcon onClick={() => removeTodo(todo.id)}
            className='delete-icon' />
        </div>
      </div>

    </>
  ));
};

export default Todo;
