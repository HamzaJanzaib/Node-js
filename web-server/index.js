const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    const log = `${new Date().toISOString()} ${req.method} ${req.url} ${req.ip}\n`;
    fs.appendFile("log.txt", log, () => {
        // res.end("Hello World");
        switch (req.url) {
            case "/":
                res.end("Hello World");
                break;
            case "/about":
                res.end("About");
                break;
            default:
                res.end("404 Not Found");
        }
    });
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});