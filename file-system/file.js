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

// fs.unlinkSync("hello.txt");

// console.log(fs.statSync("contact.txt"));

// const Stats = {
//   dev: 175125993,
//   mode: 33206,
//   nlink: 1,
//   uid: 0,
//   gid: 0,
//   rdev: 0,
//   blksize: 4096,
//   ino: 1125899908635026,
//   size: 1089,
//   blocks: 8,
//   atimeMs: 1770068611079.7751,
//   mtimeMs: 1770068460624.3933,
//   ctimeMs: 1770068460624.3933,
//   birthtimeMs: 1770067986101.9265
// }

// console.log(fs.statSync("contact.txt").isFile());

// fs.mkdirSync("newFolder/test", { recursive: true });
// fs.mkdirSync("newFolder/test2", { recursive: true });

// fs.writeFileSync("newFolder/test.txt", "Learning Node.js file system");
// fs.writeFileSync("newFolder/test2.txt", "Learning Node.js file system");

// fs.copyFileSync("newFolder/test.txt", "newFolder/test2.txt");