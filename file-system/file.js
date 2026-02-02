// require the fs module
const fs = require("fs");
// sync write file
// fs.writeFileSync("file.txt", "Learning Node.js file system");

// async write file
// fs.writeFile("file.txt", "Learning Node.js file system async", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("File created");
//   }
// });

// read file async
// fs.readFile("contact.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// read file sync
// const data = fs.readFileSync("contact.txt", "utf8");
// console.log(data);

// small difference between sync and async
// sync : block the code execution until the file is read
// async : does not block the code execution

// fs.appendFileSync("contact.txt", "14. Jennifer White - Phone: +1-555-0114 - Email: jennifer.white@email.com\n");

// const data = fs.readFileSync("contact.txt", "utf8");
// console.log(data);

// fs.writeFileSync("copy.txt", "");

// fs.copyFileSync("contact.txt", "copy.txt");

fs.unlinkSync("hello.txt");
