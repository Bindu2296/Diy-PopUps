const express = require('express')
const app = express()
const parser = require('body-parser')
const userService = require('./services/userService');

app.use(parser.json())

// enable CORS 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/status',(req,res) => {
    res.json('System is up');
}).listen(4200,()=>{
    'Server Started'
});

// fetch all users
app.get('/users',(req,res) => {
    res.setHeader('Content-Type','application/json')
    userService.fetchAll((data)=>{
        res.end(JSON.stringify(data))
    })
});

//fetch users by name


app.get('/users/find/:username/:password',(rq,rs)=>{
    rs.setHeader('Content-Type','application/json')
    userService.getName(rq.params.username,rq.params.password,(result,err)=>{
        if(err){ rs.statusCode(500).json('Unable to process your request,please try again later')
     } else{
    rs.json(result)
        }
    })
})


//fetch users by name
app.get('/users/findByName/:name',(req,res) => {
    res.setHeader('Content-Type','application/json')
    let uname = req.params.name
    userService.fetchByName(uname,(results) =>{
        res.json(JSON.stringify(results))
    })
});
// add a new user
app.post('/user/add',(req,res)=>{
    let userObj = req.body
    res.setHeader('Content-Type','application/json')
    userService.addUser(userObj,(err)=>{
        if(err) res.statusCode(400).end('User Couldnt be Added,please try again later')
        else res.json('User Added Successfully')
    })
})

app.delete('/users/delete/:id',(req,res)=>{userService.deleteUser(parseInt(req.params.id),(err)=>{if(err){
    res.status(500).send({
        error:"Unable to process",
        trace:err
    })
}else{
    res.status(200).send({message:"Employee deleted"})
}})})

// update an existing user
app.put('/user/edit',(req,res)=>{
    let userObj = req.body
    res.setHeader('Content-Type','application/json')
    userService.editUser(userObj,(err,result)=>{
        if(err) res.statusCode(400).json('User Couldnt be Added,please try again later')
        else{
                res.json(JSON.stringify({ message:'User Modified' ,response : result }))
                //res.redirect('/users')
        }
    })
})

app.get('/user/find/id/max',(rq,rs)=>{
    userService.getLastId((id,err)=>{
        if(err) rs.statusCode(400).json('Unable to process your request,please try again later')
        else{
                rs.json({maxId:id})
        }
    })
})
