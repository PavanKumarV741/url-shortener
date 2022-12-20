const mongoose=require("mongoose")
const shortId = require('shortid')

const shorturlSchema=new mongoose.Schema({
    full:{
        type:String,
        required:true
    },
    short:{
        type:String,
        required:true,
        default: shortId.generate
    },
    clicks:{
        type:Number,
        required:true,
        default:0
    }
})



// const shorturlModel=mongoose.model("shorturl",shorturlSchema)

// module.exports={shorturlModel}
module.exports=mongoose.model("shorturl",shorturlSchema)