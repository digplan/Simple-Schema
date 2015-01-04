Simple-Schema
=============

Type checking of objects    

Takes a JSON or YAML definition file name:
````
person: 
  - name!:String
  - address:address
  - age:Number

address: 
  - number:Number

OR 

{
  "person": ["name!:String", "address:address", "age:Number"],
  "address": ["number:Number"]
}
````

Each key is a type.    
Each property is a field, with a type.    
A type is a JS function that must return its single argument.    
So, String and Number are built in..  String("hi") === "Hi"    


````
// define custom functions

var custom = {
  address: function(a){ return a }
}

var ss = require('./simple-schema.js');
ss('./schema.yaml', custom);
````

example..
````
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
````