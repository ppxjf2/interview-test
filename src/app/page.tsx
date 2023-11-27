"use client";

import './styles/home.css';

import React, { FormEvent, useState, useEffect } from 'react'

import { useRouter } from 'next/navigation';
import ReactDOM from 'react-dom';
import Image from 'next/image'
import logo from './images/Connexin-Logo-Red.png'


export default function Home() {
  const router = useRouter();  
  let [inputType, setInputType] = useState<string>("password")
  let [boxColour, setBoxColour] = useState({background: ""})
  
  useEffect(() => { 
    if(window.localStorage.getItem('access_token')) {
      router.push('/profile');
    }
    
  }, [])

  async function onClick() {
    if(inputType === "text") {
      setInputType("password");
    } else {
      setInputType("text");
    }
  }
  
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const target = event.currentTarget;

    const formData = {
      "username": target.username.value,
      "password": target.password.value
    }

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(formData)

    })

    const data = await response.text()

    if(response.status == 200){
      window.localStorage.setItem('access_token', data)
      router.push('/profile');

    } else if(response.status == 401) {
      const unauthorised = document.getElementById('unauthorised');
      ReactDOM.render(<div id="error">Username/password incorrect. Please try again</div>, unauthorised)    
      setBoxColour({background: "#db9797"})
    } 
    
  }


  return (
    <main>
      <div id="page">
      <div id="unauthorised"></div>
        <div id="login">
          <Image src={logo} id="logo" alt="Picture of the author"/>
          {/* <form action="/profile" method="POST"> */}
          <form onSubmit={handleSubmit}>
            <label>Username:</label><br></br>
            <input type="text" name="username" id="username" defaultValue="" placeholder="Username" className='textbox' style={boxColour}></input><br></br>
            <label>Password:</label><br></br>
            <input type={inputType} name="password" id="password" defaultValue="" placeholder="Password" className='textbox' style={boxColour}></input><br></br>
            <input onClick={onClick} type="checkbox" ></input>
            <label className='checkbox'>Click to unhide password</label>
            <button type="submit" className="button">Login</button><br></br>
          </form>
        </div>
      </div>
      
    </main>


  );
}

