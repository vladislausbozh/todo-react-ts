import React, { useState } from 'react';
import './App.css';
import TodoList from './componets/TodoList';
import { v1 } from 'uuid'

export type ValuesFilterType = 'all' | 'complited' | 'active'

type TodolistType = {
  id: string
  title: string
  filter: ValuesFilterType
}


function App() {
  

  const removeTasks = (id: string,todolistId:string) => {
    let tasks = tasksObj[todolistId];
    let tasksFilter = tasks.filter( t => t.id !== id);
    tasksObj[todolistId] = tasksFilter;
    setTasks({...tasksObj});
  }

  const changeFilter = (value: ValuesFilterType, todolistId: string) => {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  const addTask = (title: string,todolistId:string) => {
    let task = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({...tasksObj});

  }

  const changeStatus = (taskId: string, isDone: boolean,todolistId:string) => {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({...tasksObj}); 
    }
    

  }

  let todolistId1 = v1()
  let todolistId2 = v1()


  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'Покупки', filter: 'active' },
    { id: todolistId2, title: 'Дела', filter: 'complited' },
  ])

  
  let [tasksObj, setTasks] = useState({
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

  

  return (
    <div className="App">
    
      {
        todolists.map((tl) => {
          
          let taskForTodolist = tasksObj[tl.id];


          if (tl.filter === 'complited') {
            taskForTodolist = taskForTodolist.filter(t => t.isDone === true)
          }
          if (tl.filter === 'active') {
            taskForTodolist = taskForTodolist.filter(t => t.isDone === false)
          }

          return <TodoList key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={taskForTodolist}
            removeTasks={removeTasks}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={tl.filter}
          />
        })
      }
    </div>
  );
}


export default App;
