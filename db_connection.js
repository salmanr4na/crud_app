const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/mongodb-first")
// mongoose.connect("mongodb+srv://salmnar4na:Salman12345@cluster0.l5tfz.mongodb.net/")

.then(()=>{
    console.log("database is connected")
    
}).catch((err)=>{
    console.log(err)
    console.log("database not connected")
    
})