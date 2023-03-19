//--- Mal for tegning i canvas.
//--- Tegning kan utføres direkte i Canva eller via Fusions tegneapier

//--- Deklarasjon av GLOBALE variabler for programmet
var bgcol = 'white';
//--- Hovedprogrammet i winInit kjøres når siden er ferdiglasta
window.onload = winInit;  

function winInit(){ // Hovedprogrammet
	tegnBrukCanvas("canvas"); // Kobler canvas i html sammen med Fusions tegnepakke
	elGetId("canvas").onclick = vedMusklikk;          // Funksjon kobles til musklikk 
	let [width,height] = tegnHentPixGeometri(); 
	elGetId('meldinger').style.width = width+'px';
	visGraf()
	print('Klikk med musa på grafen') // Fra Fusuin. Skriver i textarea med id='meldinger'
}

function f(x){ // Matematisk funksjon
	return (sin(x)*cos(2*x)) // Alternativt Math.sin(x) eller Math.cos(x)
}

function visGraf(){  // Fulabs tegnepakke benyttes.
    tegnBrukBakgrunn('lightgrey');
	tegnBrukXY(-6.3,6.3,-2,2);
	tegnAkser();
	tegnGraf(f,'black');   // Her tegnes den matematiske funksjonen sin(x) som finnes i fusionInterface.js
	xPOI = 1.4
	tegnXlinje(xPOI,'blue') // Vertikal linje
	let a = tegnTangent(xPOI,f)
	tegnStigning(xPOI,f(xPOI),a) 
	
	xPOI = 4.41
	tegnP
	tegnYlinje(f(xPOI),'red') // Horisontal linje
	
	tegnTittel('sin(x)*cos(2*x)');
	clearprint();  
}

function vedMusklikk(event){
	let xp = event.offsetX
	let	yp = event.offsetY
	let [xv,yv] = tegnPix2V(xp,yp) // Verdenskoordinater fra pikselkoordinater
	print('Punkt:', '('+xv.toFixed(2)+','+ yv.toFixed(2) +')' );
}