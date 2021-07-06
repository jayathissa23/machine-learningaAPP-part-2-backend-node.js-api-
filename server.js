const express =require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app=express();

app.use(bodyParser.json());

const database={
    users:[
        {
          id:'123',
          name:'jhon',
          email:'jhon@gamil.com',
          password:'cookies',
          entries:0,
          joined:new Date(),  
        },
        {
            id:'1234',
            name:'sally',
            email:'sally@gamil.com',
            password:'bananas',
            entries:0,
            joined:new Date(),  
          },
    ],
    login:[
        {
            id:'987',
            has:'',
            email:'john@gmail.com'
        }
    ]
}
    

app.get('/',(req,res)=>{  
    res.send(database.users);
})


app.post('/signin',(req,res)=>{

    bcrypt.compare('cookies', '$2a$10$wT88C79QFJzYmnQ8zefBhu2eGLqlhGBmi0/wTq5pFuoVa7JS5uiC2', function(err, res) {
        console.log('1',res);
     });    
    bcrypt.compare('cookies1', '$2a$10$fzKxwYzdY14gyYzmqIPEceatX.A9qGqKC3xTSkjvC1PiYHOnj6SZi', function(err, res) {
        console.log('2',res);
     });     

    if(req.body.email===database.users[0].email &&
    req.body.password===database.users[0].password){
        res.json('sucsses');
    }else{
        res.status(400).json('error login');
    } 
})

app.post('/register',(req,res)=>{
    // res.send(req.body);
    const {email,name,password}=req.body;

    bcrypt.hash(password, null,null, function(err, hash) {
       console.log(hash);
    });  



    database.users.push({
    "id":"1235",
    "name":name,
    "email":email,
    "password":password,
    "entries":"0",
    "joined":"new Date()"
    })


    console.log(req.body);
    res.send(database.users);  
    
    
})  

app.get('/profile/:id',(req,res)=>{

   const {id}=req.params;
   let found=false;
   database.users.forEach(user=>{
       if(user.id===id) {
            found=true
           return res.json(user);
       } 
    })
    if(!found) res.status(440).json('not found');

   
})

app.post('/image',(req,res)=>{

    const {id}=req.body;
    let found=false;
    database.users.forEach(user=>{
        if(user.id===id) {
             found=true
             user.entries++;
            return res.json(user);  
        } 
     })
     if(!found) res.status(440).json('not found');
 
    
 })



app.listen(3000,()=>{
    console.log(`app runung 3000 port`);
})
  
/* 
/--> res = this is working
/signIn --> POST = success/fail
/register --> POST =user 
/profile/:userId --> GET =user 
/image --> PUT =user 
*/

