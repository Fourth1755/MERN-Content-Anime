import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import { useState,useEffect } from "react";
import renderHTML from "react-render-html";

const SingleComponent=(props)=>{
    const [blog,setBlog]=useState("")
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
        .then(response=>
            setBlog(response.data))
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])
    return(
        <div>
            <NavbarComponent/>
            {blog &&  
            <div className="continer p-5">
                <h1>{blog.title}</h1>
                <div>{renderHTML(blog.content)}</div>
                <p className="text-muted">
                                ชื่อผู้แต่ง : {blog.author}, 
                                เผยแพร่วันที่ : {new Date(blog.createdAt).toLocaleDateString()}, 
                                อัพเดตล่าสุด : {new Date(blog.updatedAt).toLocaleDateString()}</p>
            </div>}
        </div>
    )
}
export default SingleComponent;