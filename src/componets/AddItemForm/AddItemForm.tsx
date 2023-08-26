

import { IconButton, TextField } from "@mui/material";
import React,{ KeyboardEvent,ChangeEvent, useState} from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


type AddItemFormType = {
   addItem: (title: string) => void
   
   
}

const AddItemForm = (props:AddItemFormType) => {

   const [error,setError] = useState<string|null>(null)
   const [newTaskTitle, setNewTaskTitle] = useState('')

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
         props.addItem(newTaskTitle.trim())
         setNewTaskTitle('') 
      } else {
         setError('введите текст')
      }
      
   }

   return(
      <div>
         
         <TextField 
            label="Value"
            size="small"
            variant={'outlined'}
            value={newTaskTitle} 
            error={!!error}
            helperText={error&& 'введите текст'}
            onChange={onNewTitleChange}
            onKeyPress={onKeyPressHendler}
         />
         
         <IconButton onClick={addTask}>
           <AddCircleOutlineIcon  />
         </IconButton>
         
         
      </div>
   )
}

export default AddItemForm;