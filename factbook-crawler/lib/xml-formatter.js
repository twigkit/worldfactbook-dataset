var fs = require('fs'),
	ejs = require('ejs');

var template = fs.readFileSync(__dirname + '/../templates/xml.ejs', 'utf8');

exports.spit = function( doc ){
	return ejs.render( template, {
		locals:{
			doc:doc,
			getField:function(data){
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
		}
	});
};
