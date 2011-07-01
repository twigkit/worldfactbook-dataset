// JavaScript Document
//	File Name:	AJAXLibrary.js
//	Created By:	Robert A. Nurse
//	Date:		Thursday, October 18, 2007
//	Purpose:	This file contains the necessary functions and constants to perform AJAX functionality

var REQUEST_NOT_INITIALIZED	= 0;
var REQUEST_SET_UP			= 1;
var REQUEST_SENT			= 2;
var REQUEST_IN_PROCESS		= 3;
var REQUEST_COMPLETE		= 4;
var ASYNCHRONOUS			= true;
var SYNCHRONOUS				= false;
var AJAXGET					= "GET";
var AJAXPOST				= "POST";

function getXMLHTTPRequestObject()
{
	var xmlHttp = null;
	
	try
	{
		// Firefox, Opera 8.0+, Safari
		xmlHttp = new XMLHttpRequest( );
	}
	catch (e)
	{
		// Internet Explorer
		try
		{
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e)
			{
				alert("Your browser does not support AJAX: " + e.description);
			}
		}
	}
	return xmlHttp;
}

 


function LoadDIVFromURLSource(DIVReference, url)
{
	var initialHTML = '<br/><br/><table cellspacing="0" cellpadding="0" align="center" width="100%"><tr><td>'
	var xmlHttp = null;

	xmlHttp = getXMLHTTPRequestObject( );

	var MM_contentVersion = 8;
	var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;
	if ( plugin )
	{
		var words = navigator.plugins["Shockwave Flash"].description.split(" ");
		for (var i = 0; i < words.length; ++i)
		{
			if (isNaN(parseInt(words[i])))
				continue;
			var MM_PluginVersion = words[i];
		}
		
		var MM_FlashCanPlay = MM_PluginVersion >= MM_contentVersion;
	}
/*	else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.appVersion.indexOf("Win") != -1))
	{
		document.write('<SCR' + 'IPT LANGUAGE="VBScript"\> \n'); //FS hide this from IE4.5 Mac by splitting the tag
		document.write('on error resume next \n');
		document.write('MM_FlashCanPlay = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & MM_contentVersion)))\n');
		document.write('</SCR' + 'IPT\> \n');
		
	}
*/	else if (window.ActiveXObject)
	{
		var version = null;
		var control = null;
		try	{
				control = new ActiveXObject('ShockwaveFlash.ShockwaveFlash' + '.' + MM_contentVersion);
		}
		catch (e)	{
			return;
		}
		if (control)	{
			MM_FlashCanPlay = true;
			version = control.GetVariable('$version').substring(4);
			version = version.split(',');
			version = parseFloat(version[0] + '.' + version[1]);
		}
	}

	if ( MM_FlashCanPlay )
	{
		initialHTML += embedFlashToString("flash/wfb_loader.swf", 380, 250);
	}
	else
	{
		initialHTML += '<IMG SRC="flash/map_noFlash.jpg" WIDTH="380" HEIGHT="250" BORDER=0 usemap="#noflash">';
	}
	//-->

	initialHTML += '</td></tr></table>';
	
	updateHTML(DIVReference, initialHTML);

	xmlHttp.onreadystatechange =	function ( )
									{
										var newHTML = '';
										if (xmlHttp.readyState == REQUEST_COMPLETE)
										{
											newHTML = xmlHttp.responseText
											updateHTML(DIVReference, newHTML);
											collapseCountryInfo();
										}
									};
	try
	{
		xmlHttp.open(AJAXGET, url, ASYNCHRONOUS);	
		xmlHttp.send(null);
	}
	catch (e)
	{
		//alert(e);
	}

	return xmlHttp;
}






function LoadTextAreaFromURLSource(textareaRef, url)
{
	var xmlHTTP = null;
	
	xmlHTTP = getXMLHTTPRequestObject( );
	
	textareaRef.value = "Loading text ...";
	
	xmlHTTP.onreadystatechange	=	function () 
									{
										if (xmlHTTP.readyState == REQUEST_COMPLETE)
										{
											textareaRef.value = xmlHTTP.responseText;
										}
									};
	try
	{
		xmlHTTP.open(AJAXGET, url, ASYNCHRONOUS);	
		xmlHTTP.send(null);
	}
	catch (e)
	{
		textareaRef.value = "AJAX Problem detected (" + textareaRef.name + "): " + e.description;
	}

}




function ajaxLoadDataFromRSSFeed(objectID, rssFeedURL)
{
	var xmlHttp = null;
	var initialMessage = '<span class="ajaxinimess">Retrieving RSS data.  Please standby ...</span>';

	updateHTML(objectID, initialMessage);

	xmlHttp = getXMLHTTPRequestObject( );

	xmlHttp.onreadystatechange =	function ( )
									{
										var newHTML = '';
										if (xmlHttp.readyState == REQUEST_COMPLETE)
										{
											newHTML = processRSSFeedData(xmlHttp.responseText);
											updateHTML(objectID, newHTML);
										}
									};
	try
	{
		xmlHttp.open(AJAXGET, rssFeedURL, ASYNCHRONOUS);	
		xmlHttp.send(null);
	}
	catch (e)
	{
		alert(e);
	}

	return xmlHttp;
}

function processRSSFeedData(retrievedXML)
{
	var newHTML = "";
	var xmlDoc = null;  // Will contain the XML document tree
	var doc = null;

	// Parse retrieved XML
	if (window.ActiveXObject)
	{
		doc = new ActiveXObject("Microsoft.XMLDOM");
		doc.async = "false";
		doc.loadXML(retrievedXML);
	}
	else
	{
		var parser = new DOMParser();
		doc = parser.parseFromString(retrievedXML, "text/xml");
	}
	
	xmlDoc = doc.documentElement;
	for (var i = 0; i < xmlDoc.childNodes.length; i++)
	{
		// Locate the channel node(s).  There will be CRLF combinations in the stream and they'll have to be skipped.  Nodes with data will have a node type of 3
		if (xmlDoc.childNodes[i].nodeType == 1 && xmlDoc.childNodes[i].tagName.toUpperCase() == 'CHANNEL')
		{
			// This is where we look for the channel info nodes (title, link and description)
			for (var j = 0; j < xmlDoc.childNodes[i].childNodes.length; j++)
			{
				// Locate the channel direct subnodes.  There will be CRLF combinations in the stream and they'll have to be skipped.  Nodes with data will have a node type of 3
				if (xmlDoc.childNodes[i].childNodes[j].nodeType == 1)
				{
					if (xmlDoc.childNodes[i].childNodes[j].tagName.toUpperCase() == 'TITLE') // Channel title
					{
						newHTML += '<span class="newHTMLHeading">Channel Title:</span> ' + xmlDoc.childNodes[i].childNodes[j].firstChild.nodeValue + "<br />";
					}
					else if (xmlDoc.childNodes[i].childNodes[j].tagName.toUpperCase() == 'LINK') // Channel link
					{
						newHTML += '<span class="newHTMLHeading">Channel Link:</span> ' + xmlDoc.childNodes[i].childNodes[j].firstChild.nodeValue + "<br />";
					}
					else if (xmlDoc.childNodes[i].childNodes[j].tagName.toUpperCase() == 'DESCRIPTION') // Channel description
					{
						newHTML += '<span class="newHTMLHeading">Channel Description:</span> ' + xmlDoc.childNodes[i].childNodes[j].firstChild.nodeValue + "<br /><br />";
					}
					else if (xmlDoc.childNodes[i].childNodes[j].tagName.toUpperCase() == 'ITEM') // Channel items
					{
						for (var k = 0; k < xmlDoc.childNodes[i].childNodes[j].childNodes.length; k++)
						{
							if (xmlDoc.childNodes[i].childNodes[j].childNodes[k].nodeType == 1)
							{
								if (xmlDoc.childNodes[i].childNodes[j].childNodes[k].tagName.toUpperCase() == 'TITLE') // Item title
								{
									newHTML += '<span class="newHTMLHeading">Item Title:</span> ' + xmlDoc.childNodes[i].childNodes[j].childNodes[k].firstChild.nodeValue + "<br />";
								}
								else if (xmlDoc.childNodes[i].childNodes[j].childNodes[k].tagName.toUpperCase() == 'DESCRIPTION') // Item description
								{
									newHTML += '<span class="itemDescHeading">Item Description</span> ' + xmlDoc.childNodes[i].childNodes[j].childNodes[k].firstChild.nodeValue + "<br />";
								}
								else if (xmlDoc.childNodes[i].childNodes[j].childNodes[k].tagName.toUpperCase() == 'PUBDATE') // Item publish date
								{
									newHTML += '<span class="newHTMLHeading">Item Publish Date:</span> ' + xmlDoc.childNodes[i].childNodes[j].childNodes[k].firstChild.nodeValue + "<br />";									
								}
								else if (xmlDoc.childNodes[i].childNodes[j].childNodes[k].tagName.toUpperCase() == 'LINK') // Item link
								{
									newHTML += '<span class="newHTMLHeading">Item LInk:</span> ' + xmlDoc.childNodes[i].childNodes[j].childNodes[k].firstChild.nodeValue + "<br />";									
								}
								else if (xmlDoc.childNodes[i].childNodes[j].childNodes[k].tagName.toUpperCase() == 'GUID') // Item guid
								{
									newHTML += '<span class="newHTMLHeading">Item GUID:</span> ' + xmlDoc.childNodes[i].childNodes[j].childNodes[k].firstChild.nodeValue + "<br /><hr />";
								}
							}
						}
					}
				}
			}				
		}
	}

	return newHTML;
}

