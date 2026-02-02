// express is a framework for building web servers and APIs

// install express
// npm install express

// create a server
const express = require("express");
const app = express();
const fs = require("fs");

// create get route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// create get route with query parameters
app.get("/users", (req, res) => {
    fs.readFile("users.json", (err, data) => {
        if (err) {
            res.send("Error reading file");
        }
        res.send(data);
    });
});

// create get route with parameter
app.get("/users/:id", (req, res) => {
    res.send(`Hello World! ${req.params.id}`);
});

// create get route with multiple parameters
app.get("/users/:id/:name", (req, res) => {
    res.send(`Hello World! ${req.params.id} ${req.params.name}`);
});

// create post route
app.post("/", (req, res) => {
    res.send("Hello World!");
});

// create put route
app.put("/", (req, res) => {
    res.send("Hello World!");
});

// create delete route
app.delete("/", (req, res) => {
    res.send("Hello World!");
});

// create patch route
app.patch("/", (req, res) => {
    res.send("Hello World!");
});

// start the server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});