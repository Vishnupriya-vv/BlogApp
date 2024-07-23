const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    Email: String,
    Password: String
  })
  const Userr = mongoose.model("Userr", userSchema);
  module.exports=Userr;