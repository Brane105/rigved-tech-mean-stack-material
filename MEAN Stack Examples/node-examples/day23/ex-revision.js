let fs = require("fs"); // imports fs module
let read = require("readline-sync");

// firstly you need to assume there's is already an array in file
let data = fs.readFileSync('emp.json');
let dataString = data.toString();
console.log("Data String: "+dataString);

//let name = read.question('Enter name: ');
//let age = read.questionInt('Enter age: ');
