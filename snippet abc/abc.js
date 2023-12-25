
var x = 10;
let y = 20;
const z = 30;
function example() {
var x = 40;
let y = 50;
const z = 60;
if (true) {
var x = 70;
let y = 80;
const z = 90;
console.log(x, y, z); // Output 1  
}
console.log(x, y, z); // Output 2
}
example();
console.log(x, y, z); // Output 3

// 70 80 90
// 40 50 60
// 10 20 30