const express = require('express')
const app = express()
const port = 3000

const users = require('./routes/users.js');

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})

app.use('/users', users);

