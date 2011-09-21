var fs = require('fs'),
	ejs = require('ejs');

var template = fs.readFileSync(__dirname + '/../templates/xml.ejs', 'utf8');

exports.spit = function( doc ){
	return ejs.render( template, {locals:{doc:doc}} );
};