function embedFlash(path, width, height) {
	document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="' + width + '" height="' + height + '">\n');
	document.write('<param name="movie" value="' + path + '">\n');
	document.write('<param name="quality" value="high">\n');
	document.write('<param name="wmode" value="transparent">\n');
	document.write('<embed src="' + path + '" quality="high" wmode="transparent" pluginspage="https://get.adobe.com/flashplayer/" type="application/x-shockwave-flash" width="' + width + '" height="' + height + '"></embed>\n');
	document.write('</object>\n');
}

function embedFlashToString(path, width, height)
{
	var returnString = "";
	returnString += ('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="' + width + '" height="' + height + '">\n');
	returnString += ('<param name="movie" value="' + path + '">\n');
	returnString += ('<param name="quality" value="high">\n');
	returnString += ('<param name="wmode" value="transparent">\n');
	returnString += ('<embed src="' + path + '" quality="high" wmode="transparent" pluginspage="https://get.adobe.com/flashplayer/" type="application/x-shockwave-flash" width="' + width + '" height="' + height + '"></embed>\n');
	returnString += ('</object>\n');
	
//	alert(returnString);
	
	return returnString;
}
 