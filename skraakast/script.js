//--- Eksempel med animasjon i canvas. Animasjon av skrått kast.
//--- Benytter tegnepakka i Fusion som finnes på https://fulab.no/fulibs/fusionSDK.js

//--- Deklarasjon av GLOBALE variabler for dette programmet
let bgcol = 'lightgrey';
let t1 = 0.0, t2 = 2.5; tstep = 0.01; // For plotting av grafen
let tid = 0.0, tidssteg = 0.01;       // For steinens posisjon i animasjonen
let animId;

//--- Hovedprogrammet i winInit kjøres når siden er ferdiglasta
window.onload = winInit;  

function winInit(){ // Hovedprogrammet. Kjøres ved oppstart av nettsida.
	tegnBrukCanvas("canvas"); // Kobler canvas i html sammen med Fusions tegnepakke

	elGetId("canvas").onclick = vedMusklikk;         // Funksjoner som kobles til musklikk 
	elGetId("start").onclick = startAnimasjon;
	elGetId("stopp").onclick = stoppAnimasjon;

	let [width,height] = tegnHentPixGeometri(); 
	elGetId('meldinger').style.width = width+'px'; // Printvinduet får samme bredde som canvas 

	plotBilde()
	print('Klikk med musa i graftegner') // Fra Fusion. Skriver i textarea med id='meldinger'
}

function startAnimasjon(){ // Når button Start klikkes
	animId = setInterval(plotBilde,1000/20)
}
function stoppAnimasjon(){ // Når button Stopp klikkes
	clearInterval(animId)
}
function plotBilde(){ // Plotter ett bilde i animasjonen. Kun steinens posisjon endrer seg.
	tegnBrukBakgrunn(bgcol); // Visker ut forrige plot

	// Delplottet til venstre
	tegnBrukSynsfelt(0.1,0.6,0.1,0.9)
	plotGrafen(t1,t2,tstep);
	plotSteinKurve(tid);
	tegnAkser('Avstand','Høyde(m)', 1,2);
	tegnTittel('Skrått kast');

	// Delplottet til høyre
	tegnBrukSynsfelt(0.65,0.9,0.1,0.9)
	plotSteinVertikal(tid)
	tegnAkser("", "", 0, 2, false, false, true)
	tegnTittel('Vertikal bevegelse');

	if (tid > t2 ){
		tid = t1;
	}
	tid = tid + tidssteg;
	tegnBrukSynsfelt(0.1,0.6,0.1,0.9) // Synsfeltet settes tilbake for å gi rett klikk-koortdinat
}

function posisjon(tid){ // Beregner punktet (x,y) for steinen og returnerer som array
	return [12*tid, 2+9*tid-4.9*tid**2]
}

function plotGrafen(t1,t2,tstep){ // Plotter banen til steinen
	let x = [];
	let y = [];
	let ysjekk
	for (let t = t1; t <= t2; t = t + tstep){
		const [xp,yp] = posisjon(t)
		if (yp >= 0 ) { 
			x.push(xp)
			y.push(yp) 
		}
	}
	
    indexMax = x.length-1
	tegnBrukXY(x[0],Math.ceil(x[indexMax]), 0, max(y)*1.10) // Autoskalerer til datasettet
	tegnKurve(x,y)

}

function plotSteinKurve(tid){ // Plotter steinen på kurven
    const [x , y] = posisjon(tid) // Merk denne: Tilsvarende tuple i Python !
	if (y > 0){ 
		tegnFyltSirkel(x,y,4,'red',true)
		tegnMelding('Steinens posisjon: ('+ x.toFixed(2) + ',' + y.toFixed(2)+')' ) // Gir alltid 2 desimaler
	}
}
function plotSteinVertikal(tid){ // Plotter steinens vertikale bevegelse
    const [x , y] = posisjon(tid)
	let xy = tegnHentXY() // For å beregne x i midten av plottet 
	if (y > 0){ 
		tegnFyltSirkel((xy[0]+xy[1])*0.5,y,4,'red',true)
	}
}
function vedMusklikk(event){ // Beregner pixelverdi om til verdenskoordinat
	let xp = event.offsetX
	let	yp = event.offsetY
	let [xv,yv] = tegnPix2V(xp,yp) 
	print('Punkt:', '('+xv.toFixed(2)+','+ yv.toFixed(2) +')' ); // Forutsetter <textarea> med id='meldinger'. 
}