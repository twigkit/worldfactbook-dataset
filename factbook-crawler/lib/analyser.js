var Apricot = require('apricot').Apricot,
	htmlparser = require("htmlparser"),
	select = require('soupselect').select,
	util = require('util'),
	domUtils = htmlparser.DomUtils;

var map = {
	xx : 'world'
}

exports.chew = function( code, html, callback ){
	var type = map[code] || 'country';
	exports[type]( code, html, callback );
};

exports.world = function( code, html, callback ){
	try {
		parse( html, function(err, dom) {
			if (err) throw err;
			var country = {};
			
			country.name = 'World';
			
			callback( undefined, country );	
		});
	}
	catch(e) {
		console.error(e);
		callback(e);
	}
}



exports.region = function( code, html, callback ){
	
}


exports.country = function( code, html, callback ){
	try {
		parse( html, function(err, dom) {
			if (err) throw err;
			var country = {};
			country.code = code;
			country.name = single('.region1 .region_name1',dom);
			country.region = single('.region1 a',dom);
			country.background = single('#CollapsiblePanel1_Intro .category_data',dom);
			country.geo = multiple('#CollapsiblePanel1_Geo','.category a','.category_data',dom);
			country.people = multiple('#CollapsiblePanel1_People','.category a','.category_data',dom);
			country.government = multiple('#CollapsiblePanel1_Govt','.category a','.category_data',dom);
			country.economy = multiple('#CollapsiblePanel1_Econ','.category a','.category_data',dom);
			country.commerce = multiple('#CollapsiblePanel1_Comm','.category a','.category_data',dom);
			country.transport = multiple('#CollapsiblePanel1_Trans','.category a','.category_data',dom);
			country.military = multiple('#CollapsiblePanel1_Military','.category a','.category_data',dom);
			country.issues = multiple('#CollapsiblePanel1_Issues','.category a','.category_data',dom);
			
			callback( undefined, country );	
		});
	}
	catch(e) {
		callback(e);
	}
};

function single(selector,dom){
	var result = select(dom, selector);
	if ( result && result[0] && result[0].children && result[0].children[0] ) return result[0].children[0].raw;
	else console.error(result);
}

function multiple(selector,title,value,dom){
	var section = select(dom, selector);
	var result = {};
	var rows = select(section,'.CollapsiblePanelContent table tr');
	var currentSubSection, currentSubSectionName;
	for ( var i = 0; i < rows.length; i++ )
	{
		var row = rows[i];
		var newSubSectionTitle = subSection(row);
		if ( newSubSectionTitle ) // subsection heading row, e.g. Location
		{
			// Persist the previous subsection
			if ( currentSubSection && currentSubSectionName )
			{
				result[currentSubSectionName] = currentSubSection;
			}
			// Prepare the new subsection
			currentSubSectionName = newSubSectionTitle;
			currentSubSection = {};
			//console.log('SUBSECTION',currentSubSectionName);
		}
		else if ( isEmptyRow(row) )
		{
			// do nothing
			//console.log("empty row",util.inspect(row,true,10));
			
		}
		else if ( row.attribs && row.attribs.class == 'category' )
		{
			// do nothing
		}
		else if ( isComplexSubsection(row) ) {
			//console.log("complex",select(row,'#data div'));
			//var elements = select(row,'div');
			
			// Get all keys and values in DOM order, as the tags and structure are mixed up
			var elements = domUtils.getElements({class:function(value){
				return value == 'category' || value == 'category_data';
			}},row,true,10);
			
			var key = currentSubSectionName, val;
			for ( var j = 0; j < elements.length; j++ )
			{
				if ( elements[j].attribs.class == 'category' ) key = getText(elements[j]);
				else if ( key && elements[j].attribs.class == 'category_data' ){
					currentSubSection[key] = getText(elements[j]);
					//if (!currentSubSection[key]) console.warn('MISSING FIELD',currentSubSectionName,key);
					key = undefined;
				}
			}
			/*var key = select(row,'#data .category');
			var value = select(row,'#data .category_data');
			if ( key && value )
			{
				for ( var j = 0; j < key.length; j++ )
				{
					if ( value[j] && value[j].children && value[j].children.length == 1 )
					{
						currentSubSection[getText(key[j])] = getText(value[j]);
					}
					else
					{
						console.warn('UNHANDLED COMPLEX SECTION ROW',currentSubSectionName);//,value[j]);
					}
				}
			}*/
		}
		else
		{
			var el = select(row,'.category_data');
			for ( var j = 0; j < el.length; j++ )
			{
				var text = getText(el[j]);
				if ( text )
				{
					currentSubSection = text;
					break;
				}
			}
			if (!currentSubSection)
			{
				console.warn('UNHANDLED SECTION',currentSubSectionName);
			}
		}
	}
	// clean up after the last loop
	result[currentSubSectionName] = currentSubSection;
	
	return result;
}

function getText(element){
	if ( element && element.children && element.children[0] ) return element.children[0].data.trim();
	return undefined;
}

function isEmptyRow(row){
	var top = select(row,'a[href=#top]'); // detect the "return to top" links
	if ( top.length > 0 ) return true;
	
	var td = select(row,'td'); // detect empty row
	for ( var i = 0; i < td.length; i++ )
	{
		if ( !td[i] || !td[i].children || td[i].children[0].length == 0 ) return true;
	}
	
	return false;
}

function isComplexSubsection(row){
	var cats = select(row,'.category');
	return ( cats.length > 0 );
}

function subSection(row){
	var a = select(row, '#field a');
	if ( !a[0] ) return undefined;
	return a[0].children[0].data.trim();
}

function parse( html, callback ){
	// now we have the whole body, parse it and select the nodes we want...
	var handler = new htmlparser.DefaultHandler(callback);
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(html);
}