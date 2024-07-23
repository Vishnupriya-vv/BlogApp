//import
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://vishnupriya:blog12345@cluster1.cesi2d8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1')
.then(()=>{
    console.log('Connected to db')
})
.catch((error)=>{
    console.log(error);
})