// REST API

// Import http Module
const http = require("http");

const users = [
  { id: 1, name: "Kunal" },
  { id: 2, name: "Rahul" },
];

const server = http.createServer((req, res) => {
  // GET all users
  if (req.method === "GET" && req.url === "/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));

    // POST new user
  } else if (req.method === "POST" && req.url === "/users") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const newUser = JSON.parse(body);
      users.push(newUser);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newUser));
    });

    // Not found
  } else {
    res.writeHead(404);
    res.end("Route not found.");
  }
});

server.listen(3000, () => {
  console.log("Server Running Port 3000.");
});
