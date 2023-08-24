import React, { useState,ChangeEvent } from "react"
import './EditebleSpan.css'

type EditableTisleType = {
   title: string
   onChenge: (newValue:string) => void
}

const EditableSpan = (props: EditableTisleType) => {
   


   let [editTitle,setEditeTitle] = useState(false)
   let [textСhange,setTextСhange] = useState('')

   const onChangeTitle = (e:ChangeEvent<HTMLInputElement>) => {
      setTextСhange(e.currentTarget.value)
   }
   const activeEditTitle = () => {
      setEditeTitle(true)
      setTextСhange(props.title)
   }
   const activeViewTitle = () => {
      setEditeTitle(false)
      props.onChenge(textСhange)
   }

   return editTitle 
      ? <input onBlur={activeViewTitle} onChange={onChangeTitle} value={textСhange} autoFocus />
      : <span className="itemText" onDoubleClick={activeEditTitle}>{props.title}</span>
}

export default EditableSpan;