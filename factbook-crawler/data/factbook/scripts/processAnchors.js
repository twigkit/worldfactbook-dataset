// JavaScript Document used to process anchors for rankorderguidetemplate.cfm and notesanddefs.cfm

function processAnchor( )
{
	var anchorStr;

	anchorStr = location.hash.split("#")[1];
	setClass(anchorStr, 'selected');  // Locate the object with ID = anchorStr and replace it's class with that defined by the name 'selected' 

}
 

function setCountryData( )
{
	var temp = window.location.search.split("?");  // Store the content on both sides of the "?" in an array

	if (temp[1])  // If a query string exists
	{
		var countryCode, countryName;
		var nameValuePairs = temp[1].split("&");
		for (var i = 0; i < nameValuePairs.length; i++)
		{
			var nameValuePair = nameValuePairs[i].split("=");
			if (nameValuePair[0] == "countryName")
			{
				countryName = nameValuePair[1];
			}
			if (nameValuePair[0] == "countryCode")
			{
				countryCode = nameValuePair[1];

				setClass(countryCode, 'selected');  // Locate the object with ID = anchorStr and replace it's class with that defined by the name 'selected' 
//				var newLocation = window.location.href.replace(window.location.hash, ("#"+countryCode));
				var newLocation = ("#" + countryCode);
				window.location.href = newLocation;
			}
		}
	}
}

function updateURL(url)
{
	var temp = window.location.search.split("?");  // Store the content on both sides of the "?" in an array
	var nameValuePairs = temp[1].split("&");
	var rankAnchorRow="", countryCode="", countryName="";

	for (var i = 0; i < nameValuePairs.length; i++)
	{
		var nameValuePair = nameValuePairs[i].split("=");
		if (nameValuePair[0] == "countryName")
		{
			countryName = nameValuePair[1];
		}
		if (nameValuePair[0] == "countryCode")
		{
			countryCode = nameValuePair[1];
		}
		if (nameValuePair[0] == "rankAnchorRow")
		{
			rankAnchorRow = nameValuePair[1];
		}
	}

	if (navigator.appName.indexOf('Microsoft') != -1) 
	{
		url.href = url.href.replace("countryCode=", "countryCode="+countryCode);
		url.href = url.href.replace(">", "");
		url.href = url.href + "?countryCode=" + countryCode + "#" + countryCode;
	}
	else
		url.href = url.protocol + "//" + url.host + url.pathname  + "?countryCode=" + countryCode + "&rankAnchorRow=" + rankAnchorRow + "#" + countryCode;
	return true;
}



function getURLValueFor(urlValueName)
{

	var retval = "", qString = window.location.search, nameValuePairs = qString.split("?")[1];
	var temp, name, value;

	if (nameValuePairs)
	{
		nameValuePairs = nameValuePairs.split("&");
		for (var i = 0; i < nameValuePairs.length; i++)
		{
			temp = nameValuePairs[i].split("=");
			name = temp[0];
			value = temp[1];
			if (urlValueName.toLowerCase() == name.toLowerCase())
			{
				retval = unescape(value);
			}
		}
	}
	return retval
}




function highlightSelectedFieldKey( )
{
	var fieldKeyToHighlight;
	var anchorValue = window.location.hash.split("#")[1];
//	alert("Anchor Value: " + anchorValue);
	if (anchorValue)  // Only if the field key anchor exists do you look for a similarly named ID
	{
		fieldKeyToHighlight = "" + anchorValue;  // Convert number to a string
		fieldKeyToHighlight = regTrim(fieldKeyToHighlight);
		if (fieldKeyToHighlight.length > 0)
			setClass(fieldKeyToHighlight, 'selected');  // Locate the object with ID = anchorStr and replace it's class with that defined by the name 'selected' 	
	}
}
