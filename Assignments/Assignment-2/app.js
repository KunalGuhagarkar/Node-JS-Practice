// Assignment 2
// Same Question as Assignment 1 but using Express
const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.sendFile('C:/Users/KUNAL/Desktop/Node/Practice/Assignments/Assignment 2/index.html');
});

app.get("/about", (req, res) => {
    res.sendFile('C:/Users/KUNAL/Desktop/Node/Practice/Assignments/Assignment 2/about.html');
});

app.get("/contact", (req, res) => {
    res.sendFile('C:/Users/KUNAL/Desktop/Node/Practice/Assignments/Assignment 2/contact-me.html');
});

app.use((req, res) => {
    res.status(404).sendFile('C:/Users/KUNAL/Desktop/Node/Practice/Assignments/Assignment 2/404.html');
})

app.listen(3000, () => {
    console.log('Server Listening to Port:3000');
});