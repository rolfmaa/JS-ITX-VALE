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
	print('Klikk med musa på grafen') // Fra Fusion. Skriver i textarea med id='meldinger'
	tegnMelding('Klikk på grafen')
}

function f(x){ // Matematisk funksjon
	return (sin(x)*cos(2*x)) // Alternativt Math.sin(x) eller Math.cos(x)
}

function visGraf(){  // Fulabs tegnepakke benyttes. Geogebra-lignende APIer
    tegnBrukBakgrunn('lightgrey');
	tegnBrukXY(-6.3,6.3,-2,2);
	tegnAkser();
	tegnGraf(f,'black');   // Her tegnes den matematiske funksjonen definert over
	
	xPOI = 1.4
	tegnXlinje(xPOI,'blue') // Vertikal linje
	let a = tegnTangent(xPOI,f) // Tangent i et gitt punkt. Numerisk beregning av stigningstall
	tegnStigning(xPOI,f(xPOI),a) // Annotering av stigningen i gitt punkt og med beregnet a
	
	xPOI = 4.41
	tegnYlinje(f(xPOI),'red') // Horisontal linje for gitt y
	
	tegnTittel('sin(x)*cos(2*x)'); 
}

function vedMusklikk(event){ // Omregner fra pikselkoordinater til verdenskoordinater
	let xp = event.offsetX // Bruker hendelsesobjektet mottatt ved onclick i canvas
	let	yp = event.offsetY
	let [xv,yv] = tegnPix2V(xp,yp) // Verdenskoordinater fra pikselkoordinater
	print('Punkt:', '('+xv.toFixed(2)+','+ yv.toFixed(2) +')' ); // NB: Krever <texarea id='meldinger>
	tegnPunkt(xv,f(xv)) // Tegner punktet. Med ekstra argumenter kan bruk av label styres.
}