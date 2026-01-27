const port = 3000;

const express = require('express')
const app = express()

const users = require('./routes/users.js');

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})

app.use('/users', users);

