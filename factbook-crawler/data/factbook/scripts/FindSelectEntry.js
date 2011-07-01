// JavaScript Document
	var globalCntryNameSearchBuffer = '';
	var globalTimer = null;
	var selcon = null;
	function FindSelectEntry(e, selectControl) /* In script_head_index.cfm */
	{
		var timeLimitBetweenKeyPresses = 3600; //seconds
		var keynum, keychar, numcheck;
		
		
		if (window.event) // IE
		{
			keynum = e.keyCode;
		}
		else if (e.which) // Netscape/Firefox/Opera
		{
			keynum = e.which;
		}
		
		keychar = String.fromCharCode(keynum);
		if ((keynum >= 65 && keynum <= 122) || keynum == 32)  // Only accept alphanumerics A-Z and a-z
		{
			clearTimeout(globalTimer);
			globalCntryNameSearchBuffer += keychar;
			selcon = selectControl;
			globalTimer = setTimeout('globalCntryNameSearchBuffer = ""', (timeLimitBetweenKeyPresses*1000));
			for (var i = 0; i < selectControl.options.length; i++)
			{
				var selectLabel = selectControl.options[i].text.toLowerCase();
				if (selectLabel.indexOf(globalCntryNameSearchBuffer.toLowerCase()) == 0)
				{
					selectControl.selectedIndex = i;
					
					// After this method concludes, Firefox moves the selection index one additional place.  This compensates for that
					if (e.which)
						--selectControl.selectedIndex;
						
					break;
				}
			}
		}
		return false;
	}


	function Clear_globalCntryNameSearchBuffer()
	{
		globalCntryNameSearchBuffer = "";
	}