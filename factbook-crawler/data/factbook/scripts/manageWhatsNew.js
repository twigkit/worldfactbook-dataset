// JavaScript Document



	function ongoingHandler(form, calendarControlID, placementControlID, defaultDate)
	{
		if (form.ongoing.checked)
		{
			hideObject(calendarControlID);
			if (placementControlID != null)
				hideObject(placementControlID);
			form.entryDate.value = "Ongoing";
		}
		else
		{
			showObject(calendarControlID);
			if (placementControlID != null)
				showObject(placementControlID);
			form.entryDate.value = defaultDate;
		}
	}
	

	var deleteForm = null;
	
	WFBYUIConfirmDialog = new YAHOO.widget.SimpleDialog("updateWarningDlg", 
													{	width: "20em", 
														effect:{effect:YAHOO.widget.ContainerEffect.FADE,duration:0.125}, 
														fixedcenter:true,  
														modal:true, 
														visible:false, 
														draggable:false, 
														close:false
													} 
												);
	WFBYUIConfirmDialog.setHeader("Warning!");
	WFBYUIConfirmDialog.setBody("You are about to permanently delete this What's-New article.  This operation cannot be undone.  Continue with the deletion?");
	WFBYUIConfirmDialog.cfg.setProperty("icon",YAHOO.widget.SimpleDialog.ICON_WARN);
	var handleContinueDeletion = function()	{
													this.hide( );  // Hide confirm dialog
													deleteForm.submit();  // Got to the deletion page.
												}
	var handleCancelDeletion = function()	{
												deleteForm = null;
												this.hide( );
											}
	var WFBYUIConfirmDialogButtons = [ {text: "Yes", handler:handleContinueDeletion}, {text:"No", handler:handleCancelDeletion} ];
	WFBYUIConfirmDialog.cfg.queueProperty("buttons", WFBYUIConfirmDialogButtons);
	
	
	
	
	WFBYUIWhatsNewValidationErrorDialog = new YAHOO.widget.SimpleDialog("updateWarningDlg", 
													{	width: "20em", 
														effect:{effect:YAHOO.widget.ContainerEffect.FADE,duration:0.125}, 
														fixedcenter:true,  
														modal:true, 
														visible:false, 
														draggable:false, 
														close:false
													} 
												);
	WFBYUIWhatsNewValidationErrorDialog.cfg.setProperty("icon",YAHOO.widget.SimpleDialog.ICON_INFO);
	var handleOK = function()	{
													this.hide( );  // Hide confirm dialog
												}
												
	var WFBYUIWhatsNewValidationErrorDialogButtons = [ {text: "Ok", handler:handleOK} ];
	WFBYUIWhatsNewValidationErrorDialog.cfg.queueProperty("buttons", WFBYUIWhatsNewValidationErrorDialogButtons);
	
	
	
	
	function ConfirmDelete(delform)
	{
		deleteForm = delform;
		WFBYUIConfirmDialog.render(document.body);
		WFBYUIConfirmDialog.show();
		return false;
	}
	
	function CheckWhatsNewEntry(form)
	{
		var retval = true;
		var message = "Your entry form has the following error(s): <br /><br />";
		form.article.value = regTrim(form.article.value);
		form.entryDate.value = regTrim(form.entryDate.value);
		
		if (form.entryDate.value.length == 0)
		{
			message += "- No date entered<br />"
			retval = false;
		}
		if (form.article.value.length == 0)
		{
			message += "- No article information entered<br />"
			retval = false;
		}
		
		if (retval == false)
		{
			WFBYUIWhatsNewValidationErrorDialog.setHeader("Validation Error");
			WFBYUIWhatsNewValidationErrorDialog.setBody(message);
			WFBYUIWhatsNewValidationErrorDialog.render(document.body);
			WFBYUIWhatsNewValidationErrorDialog.show();
		}
		return retval;
	}
	
	