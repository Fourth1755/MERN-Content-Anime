import { useState,useEffect } from "react";
import axios from "axios";
import NavbarComponent from "./NavbarComponent";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import renderHTML from "react-render-html";
import { getUser,getToken } from "../servies/authorize";
const BlogsComponent=()=>{
    //ใช้ state ในการดึงข้อมูลมาจาก API 
    const [blogs,setBlogs]=useState([])
    const fetchData=()=>{
        axios.get(`${process.env.REACT_APP_API}/blogs`)
        .then(response=>{
            setBlogs(response.data)
        })
        .catch(err=>alert(err));
    }
    //ใช้ useEffect ในการสั่งใช้งาน fetchData ทันทีที่เปิดหน้านี้ขึ้นมา
    useEffect(()=>{
        fetchData()
    },[])

    const confrimDelete=(slug)=>{
        //axios.delete(`${process.env.REACT_APP_API}/blog`)
        Swal.fire({
            title:"คุณต้องการลบบทความหรือไม่?",
            icon:"warning",
            showCancelButton:true
        }).then((result)=>{
            if(result.isConfirmed){
                deleteBlog(slug)
            }
        })
    }
    const deleteBlog=(slug)=>{
        axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`,{
            headers:{
                authorization:`Bearer ${getToken()}`
            }
        })
        .then(response=>{
            Swal.fire("Deleted",response.data.message,"success")
            fetchData()
        })
        .catch(err=>alert(err))
    }
    return(
        <div>
            <NavbarComponent/>
            <div className="container p-5">
                <h1>บทความทั้งหมด</h1>
                {blogs.map((blog,index)=>(
                    <div className="row" key={index} style={{borderBottom:'1px solid silver'}}>
                        <div className="col pt-3 pb-2">
                            <Link to={`/blog/${blog.slug}`}>
                                <h3>{blog.title}</h3>
                            </Link>
                            <div className="pt-3">{renderHTML(blog.content.substring(0,250))}</div>
                            <p className="text-muted">
                                ชื่อผู้แต่ง : {blog.author}, 
                                เผยแพร่วันที่ : {new Date(blog.createdAt).toLocaleDateString()}, 
                                อัพเดตล่าสุด : {new Date(blog.updatedAt).toLocaleDateString()}</p>
                                {getUser() && (
                                    <div>
                                        <Link to={`/edit/${blog.slug}`} className="btn btn-primary">
                                        แก้ไขบทความ
                                        </Link>
                                        <button className="btn btn-danger" onClick={()=>confrimDelete(blog.slug)}>ลบบทความ</button>
                                    </div>
                                )
                                }
                                
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default BlogsComponent;