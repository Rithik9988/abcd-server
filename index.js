import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app= express()
app.use(express.json())
app.use(express.urlencoded())



mongoose.connect('mongodb+srv://rithik4123:rithik4123@cluster0.wcuz2pn.mongodb.net/test', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database!');
    
  })
  .catch(err => {
    console.error('Error connecting to database:', err.message);
  });

const userSchema=new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const User = new mongoose.model("User",userSchema)

//routes
app.post("/login",(req,res)=>{
    const{ email,password} = req.body
    User.findOne({email: email},(err,user)=> {
         if(user){
          if(password===user.password){
            res.send({message:"login successful",user: user})
          }else{
            res.send({message:"password did not match"})
          }
         }else{
            res.send({message:"User not found"})
         }

    })
})

app.post("/register",(req,res)=>{
    const { name,email,password} = req.body
    User.findOne({email:email},(err,user)=>{
         if(user){
            res.send({message:"already registered"})
         }else{
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                }else{
                    res.send({message: " registered successfully,please login"})
                }
            })

         }
     } )
  
})
app.listen(9000,()=>
{
    console.log("server connected at port 9000")
})
