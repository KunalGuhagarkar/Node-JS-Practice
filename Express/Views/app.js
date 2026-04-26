// Views
/*
In Node.js (especially with Express), “views” refer to the HTML templates or frontend pages that your server renders and sends to the browser. They are usually stored in a views folder and rendered using a view engine (like EJS, Pug, Handlebars, etc.).
*/

const express = require('express');
const app = express();

const path = require('node:path');

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

// Using res.locals (local variables) in EJS
app.use((req, res, next) => {
    res.locals.siteName = "MyApp";
    res.locals.currentUser = req.user || { name: 'Guest' };
    next();
})

// EJS Syntax
// Go To -> views/index.ejs

// app.get("/", (req, res) => {
//     res.render("index");
// });

// Using local variables
app.get("/message", (req, res) => {
    res.render('index2', { message: "This is a message." })
});

/*
Reusable templates

You may want to include webpage components that are shared across different pages, such as a sidebar or a header. To insert such components into your pages, we make use of the include command. This requires the name of the file to be inserted, and optionally an object of data you wish to pass.
*/

// Create navbar.ejs Component (views/navbar.ejs)

const links = [
    {href: '/', text: "Home"},
    {href: 'about', text: "About"}
];

app.get('/', (req, res) => {
    res.render('index', {links: links});
});

// Static Assets
/*
Static assets are files that do not change on the server (like style.css, script.js, logo.png). 
*/
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));



app.listen(3000, () => {
    console.log('Server Running on Locahost:3000');
});