// Performs field parsing on the data for a given country
exports.chew = function( region, callback ){
	
	traverse( region );
	callback( undefined, region );
};

var compiledRegEx = {};

var multipliers = {
	"million":1000000,
	"billion":1000000000,
	"trillion":1000000000000
};

var units = [
	"%",
	"% annual rate of change",
	"% of GDP",
	"% of total population",
	"annual rate of change",
	"bbl",
	"bbl/day",
	"births/1,000 population",
	"children born/woman",
	"cu km",
	"cu km/yr",
	"cu m",
	"cu m/yr",
	"deaths/1,000 population",
	"deaths/1,000 live births",
	"km",
	"kWh",
	"m",
	"male\\(s\\)/female",
	"migrant\\(s\\)/1,000 population",
	"nm",
	"of total population",
	"sq km",
	"years"
];

var p = {
	number : "[\\.,0-9]+",
	somethingInBrackets : "\\([^\\)]+\\)",
	year : "[0-9]{4}",
	space : "[ ]"
};

function parseNumber(str){ return parseFloat(str.replace(",",""),10); }

p.units = units.join("|");
p.multiplier = [];
for ( var multiplier in multipliers ) p.multiplier.push(multiplier);
p.multiplier = p.multiplier.join("|");

var regex = {
	number : { // Matches a simple number field with an optional trailing bracket
		pattern : function(){
			var pattern = "^("+p.number+")[ ]*("+p.multiplier+")*[ ]*("+p.somethingInBrackets+")*$";
			return new RegExp(pattern,"i");
		},
		format : function(){
			var number = parseNumber(RegExp.$1);
			var multiplier = typeof(RegExp.$2) === 'string' ? multipliers[RegExp.$2] : 1;
			return number * multiplier;
		}
	},
	currency : {
		pattern : function(){
			var pattern = "^\\$("+p.number+")[ ]*("+p.multiplier+")*[ ]*("+p.somethingInBrackets+")*$";
			return new RegExp(pattern,"i");
		},
		format : function(){
			var number = parseNumber(RegExp.$1);
			var multiplier = typeof(RegExp.$2) === 'string' ? multipliers[RegExp.$2] : 1;
			return { usd : number * multiplier };
		}
	},
	unit : {
		pattern : function(){
			return new RegExp("^("+p.number+")[ ]*("+p.units+")[ ]*("+p.somethingInBrackets+")*$","i");
		},
		format : function(){
			return { 
				quantity:parseNumber(RegExp.$1), 
				unit:RegExp.$2
			}
		}
	},
	unitMultiplier : {
		pattern : function(){
			return new RegExp("^("+p.number+")[ ]*("+p.multiplier+")[ ]*("+p.units+")[ ]*("+p.somethingInBrackets+")*$","i");
		},
		format : function(){
			var number = parseNumber(RegExp.$1);
			var multiplier = typeof(RegExp.$2) === 'string' ? multipliers[RegExp.$2] : 1;
			return { 
				quantity:number * multiplier, 
				unit:RegExp.$3
			}
		}
	},/*
	leading  : {
		pattern : /^([\\w ]+)*([0-9,\\.]+)[ ]*(sq km|km|%|m|nm|births\/1,000 population|deaths\/1,000 population)[ ]*([ \\(\\)a-z0-9\\.]+)*$/i, // captures "number unit" e.g. "1,234.56 sq km"
		//          intro text     quantity          unit                                                               training text           
		convert : function( str ){
			try {
				return { 
					text:str, 
					quantity:parseFloat(RegExp.$2,10), 
					unit:RegExp.$3
				}
			}
			catch(e){
				console.warn("Conversion failed",str);
				return str
			}
		}
	},*/
	geo : {
		pattern : function(){
			return /([0-9]+) ([0-9]+) (N|S), ([0-9]+) ([0-9]+) (W|E)/i; // matches "12 30 N, 69 58 W"
		},
		format : function(){
			var result = {};
			result[RegExp.$3] = { minutes:parseFloat(RegExp.$1,10), seconds:parseFloat(RegExp.$2,10) };
			result[RegExp.$6] = { minutes:parseFloat(RegExp.$4,10), seconds:parseFloat(RegExp.$5,10) };
			return result;
		}
	}
};

function traverse( obj ){
	for ( var property in obj ) {
		
		var objType = typeof(obj[property]);
		
		if ( objType === 'object' ) traverse(obj[property]); // recurse nested objects
		else if ( objType === 'string' )
		{
			// process string value
			obj[property] = process(obj[property]);
		}
		else if ( obj[property] ) {
			// all values should be strings because they've just been scraped off HTML
			console.log("unexpected type",objType,obj[property]);
		}
	}
}

function process( str ){
	if ( str && str.length < 200 )
	{
		for ( var type in regex )
		{
			if ( !compiledRegEx[type] ) compiledRegEx[type] = regex[type].pattern();
			if ( compiledRegEx[type].test(str) ){
				//console.log("detected",type,str);
				try {
					return regex[type].format(str);
				}
				catch(e){
					console.warn("Conversion failed",str,e.message);
					return str
				}
			}
		}
		//console.log("undetected",str);
	}
	return str;
}