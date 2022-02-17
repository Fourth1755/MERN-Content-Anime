const mongoose=require('mongoose');

const authSchema =mongoose.Schema({
    usesrname:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
},{timestamps:true})

module.exports =mongoose.model("Auth",authSchema);