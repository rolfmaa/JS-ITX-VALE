/* IT2 teamtools APIs - Version 3 16.12.2021
*
*  This library contains a set of functions that enables
*  intercation between HTML and JavaScript.
*  It is id-based, meaning that name in the argument lists are
*  the names of the id as defined in HTML.
*/

// Level 1 - Basic components
//&intro: Biblioteket inneholder JS-funksjoner som opererer med HTML-elementer.Disse er navngitt med et idnavn.

//&comment: Basisfunksjoner
function elGetId(name){ // Returns HTML-element given by id-name
    return document.getElementById(name);
}
function elOn(name){ // Set visibility of element (id) to visible
	elGetId(name).style.visibility = "visible";
	elGetId(name).style.display = "inline";
}
function elOff(name){ // Set visibility of element (id) to invisible
	elGetId(name).style.visibility = "hidden";
	elGetId(name).style.display = "none";
}
function elDisable(name){ // Disables an element. (if button, the button can not be clicked on)
	elGetId(name).disabled = true;
}
function elEnable(name){ // Enables an element.
	elGetId(name).disabled = false;
}
//&comment: Hente verdier fra HTML eller sette verdier i HTML-elementer
function elGetNumber(name){ // Get number from input-field
	var htmlObject;
	htmlObject = elGetId(name);
	var value = htmlObject.value; // Value is data type text !
	return Number(value); // Converts to number
}
function elPutNumber(name,value){ // Write number to input-field
	var htmlObject;
	htmlObject = elGetId(name);
	htmlObject.value = value; // Value is data type text !
}
function elPutText(name,value){ // Write text to input-field
	var htmlObject;
	htmlObject = elGetId(name);
	htmlObject.value = value; // Value is data type text !
}
function elGetText(name,value){ // Get text from input-field
	var htmlObject;
	htmlObject = elGetId(name);
	return htmlObject.value;  // Value is data type text !
}
function elPutHTML(name,html) { // Update HTML code for an element (like paragraph)
	elGetId(name).innerHTML = html;
}

// Level 2 - More complex components like tables and option lists
//&comment: Sammensatte elementer - Tabeller og nedtrekksmenyer
function elCreateTable(name,headText,data,callback='undefined'){ // Show data in 2D table. callback is a function with row number and column number as arguments. Can be used to interact withtable celles (clicks).
// Can have a callbak defined as <function>(row,col)
/* 
Nice css attributes to control:
table, th, td {
	border: 1px solid;
	border-collapse: collapse;
	text-align: center;
}	
*/
  elGetId(name).innerHTML = ' ';
	var thead = '';
	var trows = '';
	var type  = typeof callback;
	var cbstring;
	if (type == "string"){
		cbstring = callback;
	}
	else {
		cbstring = callback.name;
	}
	
	// Create header row in table
	if (headText.length > 0 ){ 
		// Header (kolonneoverskrifter)
		var thead = '<tr>';
		var headere  = headText.length;
		
		for (var i = 0; i < headere; i++){
			thead = thead + '<th>' + headText[i] + '</th>';
		}
		thead = thead + '</tr>';
	}
	// Create data rows in table
	if (data.length > 0 ){ 
		// Rader med data
		var trows = '';
		var ndata;
		var rader = data.length;
		var kolonner = data[0].length;
		for (var row = 0; row < rader; row++){ // Loop over rader
		    trows = trows + '<tr>';
			var trow = '';
			for (var felt = 0; felt < kolonner; felt++){ // Loop over felter (kolonner) i hver rad
				if (callback != 'undefined') {
					ndata = '<td onclick='+cbstring+'('+row+','+felt+')>' + data[row][felt] +  '</td>';
					trow = trow + ndata;
				}
				else { 
					ndata = '<td>' + data[row][felt] +  '</td>';
					trow  = trow + ndata;
				}
				//trows = trows + '<td>' + data[row][felt] +  '</td>';
			}
			//console.log(trow);
			trows = trows + trow + '</tr>';
		}
	}
	elGetId(name).innerHTML = thead+trows;
}
function elCreateSelect(name,valgListe,callback='undefined'){ // Lager lista som skal vises i HTML
	var htmlTekst = '';
	var optionTekst;
	var type  = typeof callback;
	var cbstring;
	if (type == "string"){
		cbstring = callback+'()';
	}
	else {
		cbstring = callback.name+'()';
	}
	//print('Callback',cbstring);
	//if (type != 'undefined') elGetId(name).onchange = cbstring;
	
	for (var i=0; i < valgListe.length; i++ ) {
		optionTekst = "<option>" + valgListe[i] + "</option>";
		htmlTekst = htmlTekst + optionTekst;
	}
	elGetId(name).innerHTML = htmlTekst;
}
function elGetSelectIndeks(name){ // Get the selected index from a Select element
    var list,listIndeks;
	list=elGetId(name);
	listIndeks = list.selectedIndex;
	return listIndeks;
}
function elGetSelectOption(name){ // Get the selected value from a Select element
    var element = elGetId(name);
	var index = elGetSelectIndeks(name);
	var option = element.options[index].value;
	return option;
}

// Level 3 - animation of HTML-elements with CSS transform 
//&comment: Transformasjon av HTML-elementer. Verktøy for å lage animaasjoner av HTML-elementer with CSS transform
function elTranslate(name,xPos,yPos){ // Translate , input pixels
	var animElement = elGetId(name);
	animElement.style.transform = "translate("+xPos+"px,"+yPos+"px)";
}
function elTranslateRel(name,xPos,yPos){ // Translate, input percentage
	var animElement = elGetId(name);
	animElement.style.transform = "translate("+xPos+"%,"+yPos+"%)";
}
function elRotate(name,rotationAngle){ // Rotate element
	var animElement = elGetId(name);
	animElement.style.transform = "rotate("+ rotationAngle +"deg)";
}
function elScale(name,scaleFactorX,scaleFactorY=scaleFactorX){ // Scale element
	var animElement = elGetId(name);
	animElement.style.transform = "scale("+scaleFactorX +"," +scaleFactorY +")";
}
function elTransform(name,xPixels,yPixels,rotationAngle,scaleX,scaleY=scaleX){ // All in one transformation (translate, rotate and scale)
	var animElement = elGetId(name);
	var command = 	"translate("+xPixels+"px,"+yPixels+"px)"+
					" rotate("+ rotationAngle +"deg)" +
					"scale("+scaleX +"," +scaleY +")";
	animElement.style.transform = command;
}