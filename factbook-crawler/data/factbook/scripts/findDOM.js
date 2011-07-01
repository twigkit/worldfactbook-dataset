// JavaScript Document
//	File Name:	findDOM.js
//	Created By:	Robert A. Nurse
//	Date:		Thursday, October 18, 2007
//	Purpose:	This file contains the necessary functions and constants to perform DHTML


var GETDOM		=	0;
var GETSTYLE	=	1;
var isDHTML		=	false;
var isID		=	false;
var isAll		=	false;
var isLayers	=	false;
var HIDDEN_CONSTANT, VISIBLE_CONSTANT;
var isIE		=	false, isNN = false, browserVersion = parseInt(navigator.appVersion, 10);
var isImage		=	false;


if ((navigator.appName.indexOf('Netscape') != -1))
	isNN = true;
else
	isIE = true;

if (document.getElementById)
{
	isID = true;
	isDHTML = true;
}
else
{
	if (document.all)
	{
		isAll = true;
		isDHTML = true;
	}
	else
	{
		if ((navigator.appName.indexOf('Netscape') != -1) && (browserVersion == 4))
		{
			isLayers = true;
			isDHTML = true;
		}
	}
}

HIDDEN_CONSTANT = (isID || isAll) ? "hidden" : "hide";
VISIBLE_CONSTANT = (isID || isAll) ? "visible" : "show";

if (document.images)
	isImage = true;

function findDOM(objectID, type)
{
	if (type == GETSTYLE)
	{
		if (isID)
		{
			return (document.getElementById(objectID).style);
		}
		else
		{
			if (isAll)
			{
				return (document.all[objectID].style);
			}
			else
			{
				if (isLayers)
				{
					return (document.layers[objectID]);
				}
			}
		}
	}
	else if (type == GETDOM)
	{
		if (isID)
		{
			return (document.getElementById(objectID));
		}
		else
		{
			if (isAll)
			{
				return (document.all[objectID]);
			}
			else
			{
				if (isLayers)
				{
					return (document.layers[objectID]);
				}
			}
		}
	}
}

function findLeft(objectID)
{
	var domStyle = findDOM(objectID, GETSTYLE);
	var dom = findDOM(objectID, GETDOM);
	var leftCoord;
	
	if (domStyle.left)
	{
		leftCoord = domStyle.left;
	}
	else if (domStyle.pixelLeft)
	{
		leftCoord = domStyle.pixelLeft;
	}
	else
	{
		leftCoord = dom.offsetLeft;
	}
	
	return leftCoord;
}

function findTop(objectID)
{
	var domStyle = findDOM(objectID, GETSTYLE);
	var dom = findDOM(objectID, GETDOM);
	var topCoord = null;

	if (domStyle.top)
	{
		topCoord = domStyle.top;
	}
	else if (domStyle.pixelTop)
	{
		topCoord = domStyle.pixelTop;
	}
	else
	{
		topCoord = dom.offsetTop;
	}
	
	return topCoord;	
}

function showObject(objectID)
{
	var domStyle = findDOM(objectID, GETSTYLE);
	domStyle.visibility = VISIBLE_CONSTANT;
	domStyle.display = '';
	domStyle.vertical_align = 'top';
}

function hideObject(objectID)
{
	var domStyle = findDOM(objectID, GETSTYLE);
	domStyle.visibility = HIDDEN_CONSTANT;
	domStyle.display = 'none';
	domStyle.vertical_align = 'top';
}

function getVisibility(objectID)
{
	var domStyle = findDOM(objectID, GETSTYLE);
	return domStyle.visibility;
}

function setVisibility(objectID, visibilityState)
{
	var domStyle = findDOM(objectID, GETSTYLE);
	domStyle.visibility = visibilityState;
}

function toggleVisibility(objectID)
{
	var vis = getVisibility(objectID);
	if (vis == "")
	{
		setVisibility(objectID, HIDDEN_CONSTANT);
		vis = getVisibility(objectID);
	}
	
	if (vis == HIDDEN_CONSTANT)
		showObject(objectID);
	else
		hideObject(objectID);
}

function findLivePageWidth( )
{
	var livePageWidth;
	
	if (window.innerWidth != null)
		livePageWidth = window.innerWidth;
	else if (document.body.clientWidth != null)
		livePageWidth = document.body.clientWidth;
	return livePageWidth;
}

function findLivePageHeight ( )
{
	var livePageHeight;
	
	if (window.innerHeight != null)
		livePageHeight = window.innerHeight;
	else if (document.body.clientHeight != null)
		livePageHeight = document.body.clientHeight;
	return livePageHeight;
}

function getObjectHTML(objectID)
{
	var theDOM = findDOM(objectID, GETDOM);
	var objHTML = "";
	
	if (isAll || isID)
		objHTML = theDOM.innerHTML;
		
	return objectHTML;
}

function updateHTML(objectID, newHTML)
{
	var theDOM = findDOM(objectID, GETDOM);
	
	if (isAll || isID)
	{
		theDOM.innerHTML = newHTML;
	}
	else if (isLayers)
	{
		theDOM.document.open();
		theDOM.document.write(newHTML);
		theDOM.document.close();
	}
	showObject(objectID);
}

function setZindex(objectID, zindex)
{
	var domStyle = findDOM(objectID, GETSTYLE);
	
	domStyle.zIndex = zindex;
}


function setClass(objectID, newClass)
{
	var dom = findDOM(objectID, GETDOM);
	dom.className = newClass;
	var a = "";
}


function setBodyClass(classes)
{
	// check if body has an existing class
	if (!document.body.className) {
		document.body.className = classes;
	}
	else {
		var newClassName = document.body.className;
		newClassName += (" " + classes);
		document.body.className = newClassName;
	}
}
