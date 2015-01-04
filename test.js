var obj = {name: 'Me'};
var badobj = {};
var good = {name: 'ok'}

var custom = {
  address: function(a){ return a }
}

var ss = require('./simple-schema.js')('./schema.yaml', custom);

if(!ss.validate('person', obj))
  console.log(obj, 'failed');

if(!ss.validate('person', badobj))
  console.log(badobj, 'failed');

if(!ss.validate('person', good))
  console.log(good, 'failed');