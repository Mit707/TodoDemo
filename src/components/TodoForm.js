import React, { useState, useEffect, useRef } from 'react';
import { Select, MenuItem, Grid } from '@material-ui/core';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [status, setStatus] = useState(props.edit ? props.edit.status : 'Active');
  const [date, setDate] = useState(props.edit ? props.edit.date : new Date());
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };
  const handleDateSelect = e => {
    let selectedDate = e
    setDate(selectedDate);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      status: status,
      date: date
    });
    setInput('');
    setStatus('Active');
    setDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {(props.edit) &&
        (
          <>
            <Grid container alignItems="center" justify="center" spacing={2}>
              <Grid item xs={12}>
                <input
                  placeholder='Update a Task'
                  value={input}
                  onChange={handleChange}
                  name='text'
                  className='todo-input'
                  ref={inputRef}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  label="Status"
                  className='todo-input'
                  value={status}
                  onChange={(e) => { setStatus(e.target.value); }}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  selected={date}
                  className='todo-input'
                  onSelect={handleDateSelect} //when day is clicked
                //dateFormat="dd-mm-yyyy"
                //onChange={handleDateChange} //only when value has changed
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} justify="center">
              <button onClick={handleSubmit} className='todo-button'>
                Update task
                </button>
            </Grid>
          </>
        )
      }
      {(!props.edit) &&
        (
          <>
            <Grid container alignItems="center" justify="center" spacing={2}>
              <Grid item xs={12}>
                <input
                  placeholder='Add a task'
                  value={input}
                  onChange={handleChange}
                  name='text'
                  className='todo-input'
                  ref={inputRef}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  label="Status"
                  className='todo-input'
                  value={status}
                  onChange={(e) => { setStatus(e.target.value); }}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  selected={date}
                  className='todo-input'
                  onSelect={handleDateSelect} //when day is clicked
                //dateFormat="dd-mm-yyyy"
                //onChange={handleDateChange} //only when value has changed
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} justify="center">
              <Grid item xs={12}>

                <button onClick={handleSubmit} className='todo-button'>
                  Add todo
                </button>
              </Grid>

            </Grid>
          </>
        )}
    </form>
  );
}

export default TodoForm;
