import CloseIcon from '@mui/icons-material/Close';
import { ValuesFilterType } from "../App"
import  React, {KeyboardEvent,ChangeEvent, useState} from 'react';
import Stack from '@mui/material/Stack';


type TaskType = {
   id: string
   title: string
   isDone: boolean
}

type PropsType = {
   id: string
   title: string
   tasks: Array<TaskType>
   removeTasks: (id: string,todolistId:string) => void
   changeFilter: (value: ValuesFilterType,todolistId:string) => void
   addTask: (title: string,todolistId:string) => void
   changeStatus: (taskId:string,isDone:boolean,todolistId:string) => void
   filter: ValuesFilterType
}

function TodoList(props: PropsType) {

   const [newTaskTitle, setNewTaskTitle] = useState('')
   const [error,setError] = useState<string|null>(null)
   

   const onNewTitleChange = (e:ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)
   }

   const onKeyPressHendler = (e:KeyboardEvent<HTMLInputElement>) => {
      setError(null)
      if (e.charCode === 13) {
         addTask()
         setNewTaskTitle('')
      }
   }

   const addTask = () => {
      if (newTaskTitle.trim() !== '') {
         props.addTask(newTaskTitle.trim(),props.id)
         setNewTaskTitle('') 
      } else {
         setError('введите текст')
      }
      
   }

   const onAllHandler = () => {
      props.changeFilter('all',props.id)
   }
   const onActiveHandler = () => {
      props.changeFilter('active',props.id)
   }
   const onComplitedHandler = () => {
      props.changeFilter('complited',props.id)
   }
   

   return (
      <div>
         <h3>{props.title}</h3>
         <input value={newTaskTitle} 
            className={error ? 'error': ''}
            onChange={onNewTitleChange}
            onKeyPress={onKeyPressHendler}
         />
         
         <button onClick={addTask}>+</button>
         {error && <div className='error-mess'>{error} </div>}
         <ul>
            {
               props.tasks.map(t => <li key={t.id}>
                  <input type='checkbox' 
                     checked={t.isDone}
                     onChange={ (e)=> props.changeStatus(t.id,e.currentTarget.checked,props.id)}
                  />
                  <span>{t.title}</span>
                  <button onClick={() => props.removeTasks(t.id,props.id)}><CloseIcon /></button>
               </li>)
            }
         </ul>
         <Stack direction='row' spacing={2}>
            <button className={ props.filter === 'all' ?'bt-active-filter' : ''} 
               onClick={onAllHandler}>Все</button>
            <button className={ props.filter === 'active' ?'bt-active-filter' : ''} 
               onClick={onActiveHandler}>Активные</button>
            <button className={ props.filter === 'complited' ?'bt-active-filter' : ''}
                onClick={onComplitedHandler}>Выполненные</button>
         </Stack>
      </div>
   )
}

export default TodoList;