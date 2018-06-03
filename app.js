const express  = require('express');
const path     = require('path');
const exphbs   = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();


// Database connection
mongoose.connect('mongodb://localhost:27017/cms', {useMongoClient: true}).then((db)=>{
    console.log('MONGO connected');
}).catch(error => console.log(error));

app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

// LOAD ROUTES
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');

// USE ROUTES
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);




app.listen(5000, ()=>{
    console.log(`Listening on port 5000`);
});