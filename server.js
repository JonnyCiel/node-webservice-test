const express = require('express');
const hbs = require('hbs');
const fs = require("fs");

const port = process.env.PORT || 8081;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = console.log(`${now}: ${req.method} ${req.url}`);

    console.log(log);
    fs.appendFile('server.log', log + '\n');

    next();
});

app.use((req, res, next) => {
   res.render("maintenance.hbs");
});

hbs.registerHelper("getCurrentYear", () => {
   return new Date().getFullYear();
});

app.get('/', (req, res) =>{
    res.render('index.hbs',{
        welcommsg: "Werlcome to my page",
        pageTitle: "Index Page"
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About Page"
    });
});


app.listen(port, () => {
console.log(`Corriendo en el puerto ${port}`)
});