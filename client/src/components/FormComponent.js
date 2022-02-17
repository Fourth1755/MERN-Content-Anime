import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import { getToken } from "../servies/authorize";

const FormComponent=()=>{
    const [state,setState]=useState({
        title:"",
        author:"Fourth"
    })
    const {title,author}=state
    //กำหนดค่าให้กับ state 
    const inputValue=name=>event=>{
        console.log(name,"=",event.target.value)
        setState({...state,[name]:event.target.value});
    }
    const [content,setContent]=useState('');
    const submitContent=(event)=>{
        setContent(event);
    }
    const submitForm=(event)=>{
        //ยังไม่ต่องทำการล้างข้อมูลเก่า
        event.preventDefault();
        //ลองแสดงค่าว่ามาไหม
        console.table({title,content,author});
        console.log("API URL",process.env.REACT_APP_API);
        axios.post(`${process.env.REACT_APP_API}/create`,
        {title,content,author},{
            headers:{
                authorization:`Bearer ${getToken()}`
            }
        }).then(response=>{
            Swal.fire(
                'Alert',
                'บันทึกข้อมูลเรียบร้อย',
                'success'
              )
            setState({...state,title:"",author:""})
            setContent("")
        }).catch(err=>{
            Swal.fire(
                'Alert',
                err.response.data.error,
                'error'
              )
        })
    }
    return(
        <div>
            <NavbarComponent/>
            <div className="container p-5">
            <h1>เขียนบทความ</h1> 
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>ชื่อบทความ</label>
                    <input type="text" className="form-control" value={title} onChange={inputValue("title")}/>
                </div>
                <div className="form-group">
                    <label>เนื้อหา</label>
                    <ReactQuill
                        value={content}    
                        onChange={submitContent}
                        theme="snow"
                        className="pd-5 mb-3"
                        placeholder="เขียนบทความ"
                        style={{height:'200px'}}
                    />
                </div>
                <br/>
                <div className="form-gorup">
                    <label>ผู้แต่ง</label>
                    <input type="text" className="form-control" value={author} onChange={inputValue("author")}/>
                </div>
                <br/>
                <input className="btn btn-primary" type="submit" value="บันทึก"/>
            </form>
        </div>
        </div>
    );
}
export default FormComponent;