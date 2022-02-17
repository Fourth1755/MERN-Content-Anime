const mongoose=require("mongoose")

const blogScehma = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:{},
        required:true,
    },
    author:{
        type:String,
        required:true,
        //default:"Admin"
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true,
    }
},{timestamps:true})

module.exports =mongoose.model("Blogs",blogScehma)