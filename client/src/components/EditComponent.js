import { useState,useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import { getToken } from "../servies/authorize";
const EditComponent=(props)=>{
    //กำหนดค่าให้กับ state
    const [state,setState]=useState({
        title:"",
        author:"",
        slug:""
    })
    const {title,author,slug}=state
    const [content,setContent]=useState("")
    const submitContent=(event)=>{
        setContent(event)
    }
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
        .then(response=>{
            const {title,content,author,slug}= response.data
            setState({...state,title,author,slug})
            setContent(content)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])
    const inputValue=name=>event=>{
        console.log(name,"=",event.target.value)
        setState({...state,[name]:event.target.value});
    }
    const submitForm=(event)=>{
         //ยังไม่ต่องทำการล้างข้อมูลเก่า
        event.preventDefault();
         //ลองแสดงค่าว่ามาไหม
        console.table({title,content,author});
        console.log("API URL",process.env.REACT_APP_API);
        axios.put(`${process.env.REACT_APP_API}/blog/${slug}`,
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
            const {title,content,author,slug}=response.data
            setState({...state,title,author,slug})
            setContent(content)
        }).catch(err=>{
            Swal.fire(
                 'Alert',
                 //err.response.data.error,
                'error'
              )
        })
    }
    const showFormUpdate=()=>(
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
                        style={{height:'200px'}}
                    />
                </div>
                <br/>
                <div className="form-gorup">
                    <label>ผู้แต่ง</label>
                    <input type="text" className="form-control" value={author} onChange={inputValue("author")}/>
                </div>
                <br/>
                <input className="btn btn-primary" type="submit" value="อัพเดต"/>
        </form>
    )
    return(
        <div>
            <NavbarComponent/>
            <div className="container p-5">
            <h1>แก้ไขบทความ</h1> 
            {showFormUpdate()}
        </div>
        </div>
    );
}
export default EditComponent;