// Timestamp basee Jan 1st 1970 00:00:00 am
// less than 0, moments before timestamp base
var moment = require('moment');

var date = moment();
date.add(100,'year');
console.log(date.format());
console.log(date.format('MMM Do, YYYY'));

console.log(date.fromNow());

// 10:35 am  6:01 am
console.log(moment().format('h:mm a'));

var timestampMoment = moment().valueOf();
var timestamp = new Date().getTime();
console.log(timestampMoment);
console.log(timestamp);

console.log(moment(1410846772760).fromNow());
