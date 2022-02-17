import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate, getUser } from "../servies/authorize";
import {withRouter} from "react-router-dom";

const LoginComponent=(props)=>{
    const [state,setState]=useState({
        username:"",
        password:""
    });
    const {username,password}=state
    const inputValue=name=>event=>{
        setState({...state,[name]:event.target.value})
    }
    const submitForm=(event)=>{
        event.preventDefault();
        console.table({username,password});
        axios.post(`${process.env.REACT_APP_API}/login`,{username,password})
        .then(
            response=>{
                authenticate(response,()=>props.history.push("/blogs"))
            }
        ).catch(
            err=>Swal.fire(
                'Alert',
                err.response.data.error,
                'error'
              )
        )
    }
    useEffect(()=>{
        getUser() && (props.history.push("/"))
    },[])
    return(
        <div>
            <NavbarComponent/>
            <div className="container p-5">
                <h1>Login</h1>
                <form onSubmit={submitForm}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={username} onChange={inputValue("username")} className="form-control" placeholder="Enter username"/>   
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={inputValue("password")} className="form-control" placeholder="Enter password"/>
                    </div>
                    <br/>
                    <button className="btn btn-success" >Login</button>
                </form>
            </div>
        </div>
    )
}
export default withRouter(LoginComponent);