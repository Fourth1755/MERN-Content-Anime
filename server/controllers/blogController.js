//ติดต่อฐานข้อมูล
const slugify=require("slugify")
const Blogs=require("../models/blog")
const { v4: uuidv4 } = require('uuid');

//บันทึกข้อมูล
exports.create=(req,res)=>{
    const {title,content,author}=req.body
    let slug=slugify(title)//มันจะทำให้ข้อความต่อกันได้

    if(!slug)slug=uuidv4();
    //ตรวจสอบค่าที่เข้ามา
    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนข้อความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาใส่เนื้อหา"})
            break;
    }
    //บันทึกค่า
    Blogs.create({title,content,author,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:"มีบทความซ้ำกัน"})
        }
        res.json(blog)
    }) 
}
//แสดงค่า
exports.getAllBlogs=(req,res)=>{
    Blogs.find({}).exec((err,blogs)=>{
        res.json(blogs)
    })
}
//ค้นหาแบบเดี่ยว
exports.singleBlog=(req,res)=>{
    const {slug}=req.params
    Blogs.findOne({slug}).exec((err,blog)=>{
        res.json(blog)
    })
}
//ค้นหาตาม key
exports.searchBlog=(req,res)=>{
    const {key}=req.params
    Blogs.find({title:{ $regex: '.*' + key + '.*' }} || {content:{ $regex: '.*' + key + '.*' }}).exec((err,blog)=>{
        res.json(blog)
    })
}
//ลบบทความ
exports.removeBlog=(req,res)=>{
    const {slug}=req.params
    Blogs.findOneAndDelete({slug}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json({
            message:"ลบบทความเสร็จสิ้น"
        })
    })
}
//แก้ไขบทความ
exports.updateBlog=(req,res)=>{
    const {slug} =req.params
    const {title,content,author}=req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json(blog)
    })
}