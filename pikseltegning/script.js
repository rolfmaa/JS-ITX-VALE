//--- Mal/eksempelprogram for tegning i canvas.

//--- GLOBALE variabler for programmet
let canvas,ctx;      // Canvas og 2D tegnekonteks
let bgcol = 'white';

//--- THE IMPORTANT GETTING STARTED
window.onload = winInit;  
function winInit(){ // Hovedprogrammet
    canvas = elGetId("canvas");                 // Hentes fra klassens kodebibliotek teamtools.js (document.getElmentById("canvas")
	ctx    = canvas.getContext("2d"); 			// Objekt som inneholder tegneverktøyet i canvas
	
	elGetId("sirkel").onclick = visSirkel;      // visSirkel kjøres ved klikk på button med id "sirkel"
	elGetId("fylt_sirkel").onclick = visFyltSirkel;
	elGetId("fylt_rektangel").onclick = visFyltRektangel;
	elGetId("viskut").onclick = viskUt;         
	elGetId("canvas").onclick = vedMusklikk;
	document.addEventListener('keypress',vedTastetrykk); // Har også keydown og keyup
	
	elGetId("meldinger").style.width = canvas.width+'px';
	visTekst()

}
//---TO MAKE CODE IT EASIER
function elGetId(idname){ // Litt enklere å kode med denne
	return document.getElementById(idname)
}
function konsoll(text){ // Utskrift i konsollet/meldingsvinduet.  
	let log = elGetId('meldinger').value;
	elGetId('meldinger').value = log+text+'\n';
}
function konsollSlett(){ // Utskrift i konsollet/meldingsvinduet.  
	elGetId('meldinger').value = '';
}

//---EXAMPLES DRAWING WITH PIXELS
function viskUt(){ // Visker ut gammel tegning i canvas
	let bgcolor = elGetId("bakgrunn").value; // Henter verdien i feltet med id='bakgrunn'
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Erase the canvas
	ctx.fillStyle = bgcolor;
	ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the specified color
	konsollSlett() // Tar konsollet samtidig
}
function visTekst(){
	ctx.font = '40px serif';
	ctx.strokeText('Pikseltegning', 50,100)
	ctx.font = '30px serif';
	ctx.fillText('med', 50,150)
	ctx.font = '20px serif';
	ctx.fillText('html5 canvas', 50,190)
}
function visFyltRektangel(){ // Grønn sirkel tegnes med pikselkoordinater. Se andre metoder i w3schools.
	ctx.fillStyle = 'lightblue';
	ctx.fillRect(0, 0, canvas.width, 20);
	ctx.fillRect(0, canvas.height-20, canvas.width, 20);
}
function visSirkel(){ // Grønn sirkel tegnes med pikselkoordinater. Se andre metoder i w3schools.
	let radius = 30, centerX = 300, centerY=200;
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'red';;
	ctx.stroke();
}
function visFyltSirkel(){ // Grønn sirkel tegnes med pikselkoordinater. Se andre metoder i w3schools.
	let radius = 13, centerX = 300, centerY=200;
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = 'green';
	ctx.fill();
	ctx.stroke();
}
//
//---HENDELSER VED MUSKLIKK OG TASTATURTRYKK
function vedMusklikk(event){ // Bestemmer hva som skjer ved musklikk i canvas
	konsoll('PX :' + event.offsetX + ' ' + event.offsetY);
}
function vedTastetrykk(event){
	konsoll(event.keyCode)
	konsoll(String.fromCharCode(event.keyCode))
}
function vedTastetrykk(event){
	konsoll('Tast:' +event.keyCode + ' ' + event.code)
}
