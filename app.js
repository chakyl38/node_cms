const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res)=>{
    res.render('home/index');
});

app.get('/about', (req, res)=>{
    res.render('home/about');
});

app.get('/login', (req, res)=>{
    res.render('home/login');
});

app.get('/register', (req, res)=>{
    res.render('home/register');
});


app.listen(5000, ()=>{
    console.log(`Listening on port 5000`);
});