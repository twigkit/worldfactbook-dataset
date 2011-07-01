// -------------------------------------------------------------------
// Switch Content Script II (icon based)- By Dynamic Drive, available at: http://www.dynamicdrive.com
// Last updated April 8th, 07. Requires switchcontent.js!
// -------------------------------------------------------------------

function switchicon(className, filtertag){
	switchcontent.call(this, className, filtertag) //inherit primary properties from switchcontent class
}

switchicon.prototype=new switchcontent //inherit methods from switchcontent class
switchicon.prototype.constructor=switchicon

switchicon.prototype.setStatus=null
switchicon.prototype.setColor=null

switchicon.prototype.setHeader=function(openHTML, closeHTML){ //PUBLIC
	this.openHTML=openHTML
	this.closeHTML=closeHTML
}

//PRIVATE: Contracts a content based on its corresponding header entered

switchicon.prototype.contractcontent=function(header){
	var innercontent=document.getElementById(header.id.replace("-title", "")) //Reference content for this header
	innercontent.style.display="none"
	header.innerHTML=this.closeHTML
	header=null
}


//PRIVATE: Expands a content based on its corresponding header entered

switchicon.prototype.expandcontent=function(header){
	var innercontent=document.getElementById(header.id.replace("-title", ""))
	innercontent.style.display="block"
	header.innerHTML=this.openHTML
	header=null
}

