var async = require('async'),
	analyser = require('./analyser'),
	fs = require('fs');
	
var pattern = new RegExp("^[a-z]+\\.html$","i");

exports.run = function( originRoot, outputRoot, format ){
	
	var dir = fs.readdirSync( originRoot )
	var matchingFiles = [];
	var formatter = require('./'+format+'-formatter');
	
	for ( var i = 0 ; i < dir.length; i++ ){
		if ( pattern.test(dir[i]) ) matchingFiles.push(dir[i].replace('.html',''));
	}
	
	async.forEachSeries( matchingFiles, function( item, callback ){
		console.log("item",item);
		fs.readFile( originRoot+item+'.html', "utf-8", function( err, data ){
			if ( err ) throw err;
			analyser.chew( item, data, function( err, data ){
				if ( err ) throw err;
				fs.writeFile( outputRoot+'/'+item+"."+format, formatter.spit( data ), function(err){
					if ( err ) throw err;
					callback();
				});
			});
		});
	}, function(err){
		if (err) throw err;
		console.log('finished succesfully');
	});
	
	//
	
}
