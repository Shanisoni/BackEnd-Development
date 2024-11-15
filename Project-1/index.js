const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8000;
const users = require('./MOCK_DATA.json')
// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());  // This is important for parsing JSON bodies

app.use( ( req , res , next ) => {
    console.log(' Middleware 1');
    req.userName = 'Shani.dev';
    // return res.json({ msg : 'Hello from Middleware 1'});
    next();
});
app.use( (req , res , next ) => {
    fs.appendFile('Logs.txt' , ` ${Date.now()} : ${req.method} : ${req.path}` , (err , data) => {
        console.log('Logs are saved');
        next();
    })
})

app.use( ( req , res , next ) => {
    console.log('Middleware 2' , req.userName);
    return res.end('Middleware 2');
    // next();
});

app.get('/api/users' , (req , res) => {
    console.log("I am in route" , req.userName);
    res.json(users);
});

app.post("/api/users" , (req , res) => {
    const body = req.body;
    // console.log(body);
    users.push({...body , id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json' , JSON.stringify(users) , (err , data )  => {
        return res.json( { status : 'Success'  , id: users.length + 1 })
    })

    return res.json( { status : 'Pending'});
   });

// 
app.route('/api/users:id').get((req , res) => {
    const id  = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user); 
})
.patch((req , res) => {
    return res.json({ status : 'Pending'});
})
.delete((req , res) => {

    return res.json( { status : 'Pending'});
});

// 

// 
// app.patch('/api/users:id' , (req , res) => {

//     return res.json( { status : 'Pending'});
// });
// 
app.get('/users' , (req , res) => {
 const html = `
  <ul> 
   ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
  </ul>    
        `;
        res.send(html);
  });

  

app.listen(PORT , ( ) => console.log('Server is running on port 8000'));