const express =require('express')
const app =express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});
exports.app = app;
const port=3000
console.log();

const mongoose =require('mongoose')
mongoose.connect('mongodb://localhost:27017/protfolio').then(_ =>{

    console.log('database connected');
    
    }).catch((err)=>console.log(err))




const profileRouter =require("./router/profile.router")
const projectRouter=require("./router/project.router")
const skillsRouter=require("./router/skill.router")
const educaionRouter=require("./router/educaion.router")
const exprienceRouter=require("./router/exprience.router")
const socialRouter=require("./router/social.router")
const useRouter=require("./router/user.router")
const cvRouter=require("./router/cv.router")

    app.use(express.json())
app.use('/uploads', express.static(require('path').join(__dirname, 'uplodes')))
app.use("/profile",profileRouter)
app.use("/project",projectRouter)
app.use("/skills",skillsRouter)
app.use("/educaion",educaionRouter)
app.use("/exprerience",exprienceRouter)
app.use("/social",socialRouter)
app.use("/user",useRouter)
app.use("/cv",cvRouter)


app.use((req,res)=>{
    res.send('hello server not found')
})

app.listen(port,_=>{
    console.log(`server start at port ${port}`);
    
})