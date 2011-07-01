// JavaScript Document

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
