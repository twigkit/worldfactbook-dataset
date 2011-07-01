// JavaScript Document

function trim(str)
{
	while (str.charAt(0) == ' ' || str.charAt(0) == '\t' || str.charAt(0) == '\n')
		str = str.substring(1, str.length);
		
	while (str.charAt(str.length-1) == ' ' || str.charAt(str.length-1) == '\t' || str.charAt(str.length-1) == '\n')
		str = str.substring(0, str.length);
		
	return str;
}




function regTrim(str)
{
	var DD = str;
	
	DD = DD.replace(/^\s+|\s+$/g,"");
	
	return DD;
}




function focusFirstField( )
{
	// Locate the first field on the first form and give it focus
	if (document.forms.length > 0)
	{
		// Find the first form field that's not hidden so focus can be given
		for (var i = 0; i < document.forms[0].elements.length; i++)
		{
			if (document.forms[0].elements[i].type && document.forms[0].elements[i].type.indexOf("hidden") < 0)  // "type" may not be defined in all elements of a form (fieldsets, e.g.)
			{
				document.forms[0].elements[i].focus();
				break;
			}
		}
	}
	return true;
}




function isTextFieldEmpty(obj)
{
	var retval;
	var objValue;
	
	objValue = trim(obj.value);
	if (objValue.length == 0)
		retval = true;
	else
		retval = false;
		
	return retval;
}




function isEmail(obj)
{
	var retval;
	
	if (isTextFieldEmpty(obj))
		retval = false;
	else if (obj.value.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
		retval = true;
	else
		retval = false;
		
	return retval;
}




