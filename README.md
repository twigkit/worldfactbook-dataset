# World Factbook Corpus #

The CIA World Factbook is a Public Domain data set comprising of geographical, 
economic and political data on every country in the world.

Data types include free text, currency, percentages, longitude & latitude, 
altitude, taxonomies, and as such it makes a viable test & demonstration corpus
for search applications, on top of the intrinsic value of the data.

Since the Factbook is not available in an easily machine-readable format, we've
created a crawler to extract the data in a way that should be easier to consume.

## Implementation ##

The crawler was written using Node.js and outputs in both XML and JSON.
Pre-generated output is provided.

## Run the crawler ##

The command below will extract data from the dataset in ./factbook-crawler/data and export it to ./data
```ssh
	node factbook-crawler/index.js
```

## Use the data ##

```node
var fs = require('fs'),
	path = require('path');
	
fs.readdirSync('./data/json').forEach(function(file){
	var country = JSON.parse(fs.readFileSync('./data/json/'+file));
	console.log( country.name )
});
```