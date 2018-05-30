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

app.listen(5000, ()=>{
    console.log(`Listening on port 5000`);
});