const mongoose=require('mongoose');
const schema=mongoose.Schema({
    Title:String,
    Content:String,
    Author:String
})

const userModel=mongoose.model('user',schema);
module.exports=userModel;