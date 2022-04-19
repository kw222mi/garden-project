import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import React from "react";
import "../style.css";


function Login() {
 
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  auth.onAuthStateChanged(user => {
    if(user){
      console.log('user loged in: ', user)
    } else {
      console.log ('user loged out')
    }
  })

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    
      <div className="login-container">
      

      <div >
      <header> Login </header>
        <input className="login-input"
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
      
          }}
        />
        <input className="login-input"
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button className= "login-btn" onClick={login}> Login</button>
      </div>

     
      
        
      <button onClick={logout}> Sign Out </button>
    </div>
  );
}



export default Login;