var jsyaml = require('js-yaml');
var fs = require('fs');

function validator(custom, obj, valid){

  var nametype = valid.split(':');
  var fieldname = nametype[0].replace(/!/, '');

  if(nametype[0].match(/!$/) && !obj[fieldname])
  	return console.log("required field ", fieldname, 'in', obj);

  var func = global[nametype[1]] || custom[nametype[1]];

  if(!func)
  	return console.log('type definition ', nametype[1], ' does not exist');

  if(obj[fieldname] && (obj[fieldname] !== func(obj[fieldname])))
  	return console.log("bad type ", nametype[1], obj[fieldname]);

  return true;

}

module.exports = function(filename, customdefs){

  _customdefs = customdefs;

  var schema = filename.match(/json$/) ? 
    require(filename) : 
    jsyaml.safeLoad(fs.readFileSync(filename).toString());

  return {

  	validate: function(type, obj){
  	  if(!schema[type]) return console.log("type " + type + " does not exist");
  	  var result = schema[type].map(validator.bind(this, customdefs, obj));
  	  return result.reduce(function(a,b){ return a&&b });
  	}

  }

}

/*
[
  "person": ["name!:String", "address:address", "age:Number"],
  "address": ["number:Number"]
]

*/