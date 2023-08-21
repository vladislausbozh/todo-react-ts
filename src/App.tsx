import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType } from './componets/TodoList';
import { v1 } from 'uuid'
import AddItemForm from './componets/AddItemForm';
import { Container } from '@mui/system';
import { Grid, Paper } from '@mui/material';



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
    { id: todolistId1, title: 'Покупки', filter: 'all' },
    { id: todolistId2, title: 'Дела', filter: 'all' },
  ])


  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todolistId1]: [
      { id: v1(), title: 'купить молоко', isDone: true },
      { id: v1(), title: 'купить хлеб', isDone: true },
      { id: v1(), title: 'купить курицу', isDone: false },
      { id: v1(), title: 'купить сливки', isDone: false }
    ],
    [todolistId2]: [
      { id: v1(), title: 'сходить на тренировку', isDone: true },
      { id: v1(), title: 'прочитать книгу', isDone: false }

    ]
  })


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
        <Grid container style={{ padding:'15px'} }>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map((tl) => {

              let taskForTodolist = tasksObj[tl.id];


              if (tl.filter === 'complited') {
                taskForTodolist = taskForTodolist.filter(t => t.isDone === true)
              }
              if (tl.filter === 'active') {
                taskForTodolist = taskForTodolist.filter(t => t.isDone === false)
              }

              return <Grid item>
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
