import React,{ FormEvent, useState } from "react";
import AddItemForm from "../AddItemForm/AddItemForm";

const Login = () => {

   const [login, setLogin] = useState('')
   const [password, setPassword] = useState('')
   
   
   const hendleSubmit = (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault()
   }

   return (
      <div>
         <form onSubmit={hendleSubmit}>
            <div>
               <label htmlFor="login">Login</label>
               <input name="login" type="text" value={login} onChange={ e => setLogin(e.target.value)} />
            </div>

            <div>
               <label htmlFor="password">Password</label>
               <input name="password" type="text" value={password} onChange={ e => setPassword(e.target.value)} />
            </div>

            <button >submitT</button>
            
         </form>

         
      </div>
   )
}

export default Login;