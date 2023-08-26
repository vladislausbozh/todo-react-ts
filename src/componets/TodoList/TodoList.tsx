
import { ValuesFilterType } from "../../App"
import Stack from '@mui/material/Stack';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableSpan from '../EditetableSpan/EditableSpan';
import React,{ ChangeEvent } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import './TodoList.css'



export type TaskType = {
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
   changeTaskTitle: (id:string,newTitle:string,todolistId:string) => void
   filter: ValuesFilterType
   removeTodoList:(todolistId:string) => void
   changeTodoListTitle:(id:string,newTitle:string) => void
}

function TodoList(props: PropsType) {

 
   const onAllHandler = () => {
      props.changeFilter('all',props.id)
   }
   const onActiveHandler = () => {
      props.changeFilter('active',props.id)
   }
   const onComplitedHandler = () => {
      props.changeFilter('complited',props.id)
   }

   const removeTodoList = () => {
      props.removeTodoList(props.id)
   }
   const changeTodolistTitle = (newTitle:string) => {
      props.changeTodoListTitle(props.id,newTitle)
   }
   
   const addTask = (title:string) => {
      props.addTask(title,props.id)
   }

   return (
      <div className='cart'>
         <h3>
            
            <EditableSpan title={props.title} onChenge ={ changeTodolistTitle } />
            <Button  onClick={removeTodoList}><DeleteIcon /></Button>
         </h3>
         
         <AddItemForm  addItem={addTask} />
      
         <ul  style={{padding:"0"}}>
            {
               props.tasks.map(t => {
               
                  const onClickHendler = () => {
                     props.removeTasks(t.id,props.id)
                  }
                  const onChengeStatus = (e:ChangeEvent<HTMLInputElement>) => {
                     props.changeStatus(t.id,e.currentTarget.checked,props.id)
                  }
                  const onChengeTitle = (newValue:string) => {
                     props.changeTaskTitle(t.id,newValue,props.id)
                  }
               
                  return <div className='item' key={t.id}>
                     <Checkbox  defaultChecked color="success" checked={t.isDone} onChange={ onChengeStatus }/>
                     <EditableSpan title={t.title} onChenge={ onChengeTitle } />
                     <Button startIcon={<DeleteIcon />} onClick={onClickHendler}></Button>
                  </div>
               })
            }
         </ul>
         <Stack direction='row' spacing={2}>
            <Button variant={ props.filter === 'all' ?'contained' : 'text'} 
               onClick={onAllHandler}>Все</Button>
            <Button variant={ props.filter === 'active' ?'contained' : 'text'} 
               onClick={onActiveHandler}>Активные</Button>
            <Button variant={ props.filter === 'complited' ?'contained' : 'text'}
                onClick={onComplitedHandler}>Выполненные</Button>
         </Stack>
      </div>
   )

}

export default TodoList;