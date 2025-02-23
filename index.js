const express = require("express")
const app = express();
const hbs = require("hbs")
const Emp = require("./model/Emp");
require("./db_connection")
const bodyParser = require("body-parser");

app.set("view engine","hbs")
const encode = bodyParser.urlencoded()
app.use(express.static("./views/public"))
hbs.registerPartials("./views/partials")

app.get("/",async(req,res)=>{
    try{
        const data = await Emp.find().sort({_id:-1})
        res.render("index",{data:data})
    }
    catch(error){
        console.log(error);
        res.render("index",{data:[]})
        
    }
})

// add 
app.get("/form",(req,res)=>{
    res.render("form",{error:{},data:{}})
})
app.post("/form",encode,async(req,res)=>{
    try{
        var data = new Emp(req.body)
        await data.save()
        res.redirect("/")

    }catch(error){
        console.log(error)
        errorMessage = {}
        error.errors.name?errorMessage['name']=error.errors.name.message:""
        error.errors.email?errorMessage['email']=error.errors.email.message:""
        error.errors.phone?errorMessage['phone']=error.errors.phone.message:""
        error.errors.dsg?errorMessage['dsg']=error.errors.dsg.message:""
        error.errors.salary?errorMessage['salary']=error.errors.salary.message:""

        res.render("form",{errorMessage:errorMessage, data:data})
    }
})

// search
app.get("/search",async(req,res)=>{
   try{
    let search = req.query.search
    var data = await Emp.find({
        $or:[
            {name:{$regex:`/*${search}/*`,$options:"i"}},
            {dsg:{$regex:`/*${search}/*`,$options:"i"}},
            {city:{$regex:`/*${search}/*`,$options:"i"}},
            {state:{$regex:`/*${search}/*`,$options:"i"}}
        ]
    }).sort({_id:-1})
    res.render("index",{data:data})
   }catch(error){
    console.log(error)
    res.render("index",{data:data})
    
   }
})

// delete 
app.get("/delete/:_id",async(req,res)=>{
    try{
        const data = await Emp.findOne({_id:req.params._id})
        await data.deleteOne();
        res.redirect("/")
    }catch(error){
        console.log(error)
        res.redirect("/")
        
    }
})

// edit 
app.get("/edit/:_id",async(req,res)=>{
    try{
        const data = await Emp.findOne({_id: req.params._id})
        res.render("edit",{errorMessage:{},data:data})
    }catch(error){
        console.log(error)
        res.redirect("/")
        
    }
})

app.post("/edit/:_id",encode,async(req,res)=>{
   try{
    var data = await Emp.findOne({_id:req.params._id})

    // update fields based on request body 
    data.name = req.body.name??data.name
    data.email = req.body.email??data.email
    data.phone = req.body.phone??data.phone
    data.dsg = req.body.dsg??data.dsg
    data.salary = req.body.salary??data.salary
    data.city = req.body.city??data.city
    data.state = req.body.state??data.state

    // save 
    await data.save();
    res.redirect("/")
   }catch(error){
    console.log(error)
    errorMessage = {}
    error.errors.name?errorMessage['name']=error.errors.name.message:""
    error.errors.email?errorMessage['email']=error.errors.email.message:""
    error.errors.phone?errorMessage['phone']=error.errors.phone.message:""
    error.errors.dsg?errorMessage['dsg']=error.errors.dsg.message:""
    error.errors.salary?errorMessage['salary']=error.errors.salary.message:""

    res.render("edit",{errorMessage:errorMessage, data:data})
}
})

app.listen(8000,console.log("server is running on port 800"))

