'use strict';
var s = 'hello';
function greet(name) {
    console.log(s+","+name+'!');
}
module.exports = {
    hello:greet,
    vari :s
};
// exports.hello = greet;
// exports.vari = s;
