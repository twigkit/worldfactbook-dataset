/* File: scripts/factbook_scripts.js */
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}



var statusmsg = ""
 function hidestatus() {
 	window.status = statusmsg
	return true
}



function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}



function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}



function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}



function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
//-->

startList = function() {
							if (document.all&&document.getElementById) {
								cssdropdownRoot = document.getElementById("cssdropdown");
								for (x=0; x<cssdropdownRoot.childNodes.length; x++) {
									node = cssdropdownRoot.childNodes[x];
									if (node.nodeName=="LI") {
										node.onmouseover=function() {
																		this.className+=" over";
																	}
										node.onmouseout = function()	{
																			this.className=this.className.replace(" over", "");
																		}
									}
								}
							}
						}

if (window.attachEvent)
	window.attachEvent("onload", startList)
else
	window.onload=startList;


	<!--
	faq = null;
	function collapseCountryInfo()
	{
		faq = new switchicon("icongroup2", "div") //Limit scanning of switch contents to just "div" elements
		faq.setHeader('<img src="graphics/close.gif" alt="Close" title="Close"/>', '<img src="graphics/open.gif" alt="Open" title="Open" />')  //Set header HTML
		faq.collapsePrevious(false) //Allow more than 1 content to be open simultanously
		faq.setPersist(true, 7) //Enable persistence to remember last switch content states for 7 days
		faq.init()
	}
	//-->


function MM_jumpMenu(targ,selObj,restore){ //v3.0
  <cfif isDefined("url.staticOut")>
  eval(targ+".location='" + selObj.options[selObj.selectedIndex].value + ".htm" + "'");
  <cfelse>
  eval(targ + ".location='" + "wfbook_countrydata_holder.cfm?countryCode=" + selObj.options[selObj.selectedIndex].value + "'");
  </cfif>
  if (restore) selObj.selectedIndex=0;
}

<!---	function MM_jumpMenu(targ, selObj, restore) { //v3.0
		var cntryCode = selObj.options[selObj.selectedIndex].value;
		LoadDIVFromURLSource('region-content', 'countrytemplate.cfm?countryCode=' + cntryCode);

		if (restore)
			selObj.selectedIndex = 0;
	}--->
//-->

/* File: scripts/factbook_scripts.js ENDS ***********************************************************************************************************************************************************************/