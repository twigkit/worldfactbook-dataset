var async = require('async'),
	scraper = require('./scraper'),
	processor = require('./processor'),
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
		fs.readFile( originRoot+item+'.html', "utf-8", function( err, rawData ){
			if ( err ) throw err;
			scraper.bite( item, rawData, function( err, structuredData ){
				if ( err ) throw err;
				processor.chew( structuredData, function( err, cleanedData ){
					fs.writeFile( outputRoot+'/'+item+"."+format, formatter.spit( cleanedData ), function(err){
						if ( err ) throw err;
						callback(); // trigger next
					});
				});
			});
		});
	}, function(err){
		if (err) throw err;
		console.log('finished succesfully');
	});
	
	//
	
}
