const express = require('express');
const app = express();
const PORT = 8000;
const users = require('./MOCK_DATA.json')

app.get('/api/users' , (req , res) => {
    res.json(users);
});

app.get('/api/users/:id' , (req , res) => {
    const id  = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user); 
})

app.get('/users' , (req , res) => {
 const html = `
  <ul> 
   ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
  </ul>    
        `;
        res.send(html);
  });

app.listen(PORT , ( ) => console.log('Server is running on port 8000'));