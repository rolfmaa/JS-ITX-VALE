// Eksempelprogram som viser hvordan lese ei fil på egen maskin uten å kjøre via en server
// Koden er lagd for ei fil lagra som csv. Fila består av ei informasjonslinje og deretter
// (x,y) punkter adskilt med tegnet ;

// Globale variabler
let xArr   = [ ];				// Oppretter en array for x-verdier
let yArr   = [ ]; 				// Oppretter en array for y-verdier
let tittel = '';
let aksetekst = [];
let separator = ';'				// Skilletegnet på fila

window.onload = winInit ;   // Når nettsiden er ferdig lasta kjøres winInit

function winInit(){
	tegnBrukCanvas("canvas"); // Kobler sammen canvas med tegnepakka
	elGetId("valgtCSV").onchange  = csvInput; // Funksjonen som mottar innholdet etter innlesing
	visCSVdata();
}

function csvInput(){ // Funksjon om knyttes til innlesingsknappen for CSV
	let file = this.files[0]; // Objektet som lagre informasjonen etter fil-inn dialogen
	let reader = new FileReader();
	reader.onload = function(evt) {
					let csvdata = evt.target.result;
					csvAnalyser(csvdata); // Funksjonen som 
				    };
	reader.readAsText(file);
}

function csvAnalyser(innhold){    // Behandler CSV-data og plotter
	xArr = [];
	yArr = [];
	let linjer = innhold.split('\n');
	tittel = linjer[0] // Første linje brukes i dette tilfellet som tittel
	aksetekst = linjer[1].split(separator)
	let rad = []
	for (let i = 2; i < linjer.length; i++){
		rad = linjer[i].split(separator);
		xArr.push(parseFloat(rad[0]));
		yArr.push(parseFloat(rad[1]));
	}
	visCSVdata();
}

function visCSVdata(){ // Plotter datasettet i arrayene 
    tegnBrukBakgrunn()
	if (xArr.length < 2){
		tegnBrukXY(0,1,0,1);
		tegnTekst('Ingen data å plotte',0.35,0.5);
	}
	else{
		let x1 = min(xArr)
		let x2 = max(xArr)
		let y1 = min(0.0,yArr)
		let y2 = max(yArr)
		tegnBrukXY(x1,x2,y1,y2); // Verdenskoordinater
		tegnBrukBakgrunn('lightgrey') //V isker ut i tilfelle innlesing av flere filer
		tegnKurve(xArr,yArr,'blue');   // Grafen
		tegnMarkørliste(xArr,yArr,'sirkel','red',3);   // Symboler for hver punkt
		tegnAkser(aksetekst[0],aksetekst[1]); // Akser med tekst fra fila (linje 1 i dette tilfellet)
		tegnTittel(tittel)
	}
}