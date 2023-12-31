import React, {  useEffect, useState } from 'react';
import './App.css';
import TodoList, { TaskType } from './componets/TodoList/TodoList';
import { v1 } from 'uuid'
import AddItemForm from './componets/AddItemForm/AddItemForm';
import { Container } from '@mui/system';
import { AppBar, Grid, Paper } from '@mui/material';
import ButtonAppBar from './componets/ButtonApp/ButtonApp';
import {  Routes, Route, Link } from 'react-router-dom';
import  Login  from './pages/Login';






export type ValuesFilterType = 'all' | 'complited' | 'active'

type TodolistType = {
  id: string
  title: string
  filter: ValuesFilterType
}
type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {



  let todolistId1 = v1()
  let todolistId2 = v1()


  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    
  ])


  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todolistId1]: [
      
    ],
    [todolistId2]: [
      

    ]
  })
  
  useEffect(()=> {
    console.log('hello')
  },[])

  const removeTasks = (id: string, todolistId: string) => {
    let tasks = tasksObj[todolistId];
    let tasksFilter = tasks.filter(t => t.id !== id);
    tasksObj[todolistId] = tasksFilter;
    setTasks({ ...tasksObj });
  }

  const changeFilter = (value: ValuesFilterType, todolistId: string) => {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  const addTask = (title: string, todolistId: string) => {
    let task = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });

  }

  const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }


  }
  const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === id);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasksObj });
    }
  }

  let removeTodoList = (todolistId: string) => {

    let filtredTodoList = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filtredTodoList)
    delete tasksObj[todolistId]
    setTasks({ ...tasksObj })
  }


  let addTodolist = (title: string) => {
    let todolist: TodolistType = {
      id: v1(),
      filter: 'all',
      title: title
    }
    setTodolists([todolist, ...todolists])
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    })
  }

  const changeTodoListTitle = (id: string, newTitle: string) => {

    let todolist = todolists.find((tl) => tl.id === id)
    if (todolist) {
      todolist.title = newTitle
      setTodolists([...todolists])
    }
  }

 

  return (
    <div className="App">
      <Container fixed> 
        <ButtonAppBar/>
        <Routes>
          <Route path='/login'element={<Login />}/>
        </Routes>
        <Grid container style={{ padding:'15px'} }>
          <AddItemForm addItem={addTodolist} />
        </Grid>      
        <Grid className='container'  container spacing={3}>
          {
            todolists.map((tl) => {

              let taskForTodolist = tasksObj[tl.id];


              if (tl.filter === 'complited') {
                taskForTodolist = taskForTodolist.filter(t => t.isDone === true)
              }
              if (tl.filter === 'active') {
                taskForTodolist = taskForTodolist.filter(t => t.isDone === false)
              }
              
              return <Grid item xs={12} sm={10} md={4}  >
                <Paper style={{ padding:'10px'}}>
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={taskForTodolist}
                    removeTasks={removeTasks}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
      
    </div>
  );


}




export default App;
