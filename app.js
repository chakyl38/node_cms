const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

// LOAD ROUTES
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');

// USE ROUTES
app.use('/', home);
app.use('/admin', admin);




app.listen(5000, ()=>{
    console.log(`Listening on port 5000`);
});