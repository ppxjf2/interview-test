"use client"
import '../styles/home.css';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import ReactDOM from 'react-dom';


export default function Profile() {
    const router = useRouter();  
    const [data, setData] = useState("");

    useEffect(() => { 
        fetch("/api/profile", {
            method: 'POST',
            body: window.localStorage.getItem('access_token')
        })
        .then(response => {
            if(response.status == 401 || response.status == 400) { 
                const profile = document.getElementById('profile');
                ReactDOM.render(
                    <div id="error">Unauthorised Token. Please try again<br></br>
                        <button onClick={onClick} className="button" style={{width: "200px"}}>Logout</button>
                    </div>, profile) 
            }
            return response.json()
        })
        .then(data => setData(data))
        
    }, [])

    async function onClick() {
        window.localStorage.removeItem("access_token")
        router.push('/');
    }
    
    return (
        <main>
            <div id="full-container">
                <div id="top">
                    <h1>Profile</h1>            
                </div>
                <div id="outer-container">

                    <div className='container left'>
                        <div id="outer-center"> 
                            <div id="center">                            
                                <div className='picture'></div>
                            </div>                   
                            <div><h2>{data.name}</h2></div>
                            <div className='extra'>Extra Information Here</div>
                            <button onClick={onClick} className="button" style={{width: "200px"}}>Logout</button>

                        </div>
                    </div>
                    <div id="profile" className='container right'>
                    
                        <table id="table">
                            <tbody>
                                <tr>
                                    <td>Name:</td>
                                    <td><input type="text" className="textbox"placeholder="Name" defaultValue={data.name}></input></td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td><input type="text" className="textbox"placeholder="Email" defaultValue={data.email}></input></td>
                                </tr>
                                <tr>
                                    <td>Phone Number: </td>
                                    <td><input type="text" className="textbox"placeholder="Phone Number" defaultValue=""></input></td>
                                </tr>
                                <tr>
                                    <td>Address Line 1:</td>
                                    <td><input type="text" className="textbox"placeholder="Address Lline 1" defaultValue=""></input></td>
                                </tr>
                                <tr>
                                    <td>Address Line 2</td>
                                    <td><input type="text" className="textbox"placeholder="Address Line 2" defaultValue=""></input></td>
                                </tr>
                                <tr>
                                    <td>Postcode:</td>
                                    <td><input type="text" className="textbox"placeholder="Postcode" defaultValue=""></input></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </main>
    );
}