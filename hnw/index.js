// learning sync and async

const fs = require("fs");

// write file
// fs.writeFileSync("test.txt", "Hello World");

// console.log("Hello");

// sync - Blocking
// console.log(fs.readFileSync("test.txt" , "utf-8"));


// async - Non Blocking
// fs.readFile("test.txt", "utf-8", (err, data) => {
//     console.log(data);
// });

// console.log("World");

// default thread pool size is 4
// max? - 8core cpu - 8

const os = require("os");

console.log(os.cpus().length);