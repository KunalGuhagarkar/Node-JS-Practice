const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/index") {
    fs.readFile("./index.html", "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500);
        console.log("Something went wrong.");
      } else {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/about") {
    fs.readFile("./about.html", "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500);
        console.log("Something went wrong.");
      } else {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/contact") {
    fs.readFile("./contact-me.html", "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500);
        console.log("Something went wrong.");
      } else {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(data);
      }
    });
  } else {
    fs.readFile("./404.html", "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500);
        console.log("Something went wrong.");
      } else {
        res.writeHead(404, { "content-type": "text/html" });
        res.end(data);
      }
    });
  }
});

server.listen(8080, () => {
  console.log(`Server Running Port 8080`);
});
