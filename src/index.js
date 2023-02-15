const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');


const route = require('./routes');
const db = require('./config/db');

//connect to DB
db.connect();

const app = express();
const port = 2500;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({    
    extended: true
}));
app.use(express.json());
//HTTP logger
app.use(morgan('combined'));

//template engine
app.engine('hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//routes init
route(app);

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})