const express = require('express');
const profile = require('./routes/profile.js');

const app = express();

app.use(express.json());
app.use(express.static('./public'));
app.set('view engine', 'pug');

const port = 3000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})

app.get('/', (req, res) => {
  if(res.send("If you can see this, the server is running!")){
    return 0;
  }
  console.log("error loading");
});

app.use('/profile', profile);

module.exports = app;