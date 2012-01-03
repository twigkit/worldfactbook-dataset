var fs = require('fs'),
	ejs = require('ejs');

var template = fs.readFileSync(__dirname + '/../templates/xml.ejs', 'utf8');

exports.spit = function( doc ){
	return ejs.render( template, {
		locals:{
			doc:doc,
			getField:getField,
			getCoordinates:getCoordinates
		}
	});
};

function getField(data){
	var a = arguments, pointer = data;
	try {
		//console.log('----');
		//console.log(a);
		for ( var i = 1; i < a.length; i++ ){
			var val = pointer[a[i]];
			if ( val === undefined || val === "" ) return "";
			pointer = val;
		}
	} catch (e) {
		console.error("field error:",e);
		//pointer = "";
	}
	return pointer;
}

function getCoordinates(){
	
	var result = "",
		value = getField.apply(this,arguments);
	
	if ( value ) 
	{
		try {
			result += "<lat>";
			if ( value.N ) result += formatAxis(value.N);
			else result += "-"+formatAxis(value.S);
	
			result += "</lat><long>";
			if ( value.E ) result += formatAxis(value.E);
			else result += "-"+formatAxis(value.W);
			result += "</long>";
		} catch (e){
			console.error("Could not format",value,e);
			result = "";
		}
	}
	return result; 
}

function formatAxis( axis ){
	var out = axis.deg + "°";
	if ( axis.min ) out += " "+axis.min+"'";
	if ( axis.sec ) out += " "+axis.sec+"\"";
	return out;
}