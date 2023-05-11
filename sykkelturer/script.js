// Eksempelprogram som viser hvordan lese ei fil på egen maskin uten å kjøre via en server
// Koden er lagd for ei fil lagra som csv. Fila består av ei informasjonslinje og deretter
// (x,y) punkter adskilt med tegnet ;

// Globale variabler
let info   = [ ];
let data   = [ ];				// Oppretter en array for alle dataene
let dagnr  = [1,2,3,4,5,6,7]    // Mandag-Søndag
let perdag = [0,0,0,0,0,0,0]
let stasjon = []
let separator = ','				// Skilletegnet på fila

window.onload = winInit ;   // Når nettsiden er ferdig lasta kjøres winInit

function winInit(){
	tegnBrukCanvas("canvas"); // Kobler sammen canvas med tegnepakka
	elGetId("valgtCSV").onchange  = csvInput; // Funksjonen som mottar innholdet etter innlesing
	lesFil('sykkelturer.csv') // Er lagra i samme mappe som index.html. Funksjon forutsetter server.
}
//
// De neste to funksjonene kan brukes ved innlesing av fil fra en server.
// Direkte innlesing fra fil må løses med asunc og await.
//
async function lesFil(filnavn) {
	filinnhold = await lastInn(filnavn);
	csvAnalyser(filinnhold);
}

function lastInn(file) {
    return fetch(file).then((response) => response.text() );
}

//
// Så kommer hjelpefunksjoner for å analysere datasettet og vise innholdet grafisk i canvas
//
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
	let linjer = innhold.split('\n');
	info = linjer[0].split(separator);
	let rad = [];
	let dato, dagnr, startStasjonId, startStasjonNavn , funnet=false;
	for (let i = 1; i < linjer.length; i++){
		if ( linjer[i].length  < 10 ) {
			continue; // Hopper til neste linje. En tom linje til slutt på fila? Ikke uvanlig.
		}
		rad = linjer[i].split(separator);
		data.push(rad);
		
		dato = new Date(rad[0].split(' ')[0])
		dagnr = dato.getDay()
		perdag[dagnr] = perdag[dagnr] + 1
		
		startStasjonId = rad[3]
		startStasjonNavn = rad[4]
		funnet = false
		for (let s = 0; s < stasjon.length; s++){
			if (stasjon[s].st_id == startStasjonId) {
				funnet = true;
				stasjonIndeks = s;
			}
		}
		//start_station_id,start_station_name
		if (!funnet){
			stasjon.push({st_id:startStasjonId, st_navn:startStasjonNavn, antall:0} )
		}
		else {
			stasjon[stasjonIndeks].antall = stasjon[stasjonIndeks].antall + 1
		}
	}
	//visInnlestData();
	visTurerPerUkedag();  // Plotter som linjediagram
	visTurerPerStasjon(); // Plotter som stolpediagram
}
function visInnlestData(){ // For testutskrift
	let rad = []
	console.log('Innleste linjer:')
	for (let i = 0; i < 10; i++){
		rad = data[i];
		console.log(rad);
	}
}
function visTurerPerUkedag(){
	//console.log('Turer per dag', perdag)
	//console.log(dagnr,perdag)

	tegnBrukSynsfelt(0.1,0.9,0.55,0.9); // Øvre synsfelt
	tegnBrukXY(1,7,0,1.10*max(perdag)); // Verdenskoordinater
	tegnKurve(dagnr,perdag,'red');
	tegnMarkørliste(dagnr,perdag,'sirkel','blue',5)
	tegnAkser('Ukedag','Turer',0,0);
	tegnTittel('Sykkelturer per ukedag [Søndag-Mandag,Oslo]','blue')
}
function visTurerPerStasjon(){
	stasjon = stasjon.sort(sorterStasjoner)
	/* For testustkrift
	for (let i = 0; i < stasjon.length; i++){
		console.log(stasjon[i].st_id,stasjon[i].antall);
	}
	*/

    let atxt = [], bot3 = [], top3 = []

	// Tegner stasjoner med færrest turer
	tegnBrukSynsfelt(0.10,0.49,0.05,0.45); // Venstre nedre synsfelt
	atxt = [stasjon[0].st_navn,stasjon[1].st_navn,stasjon[2].st_navn]
	bot3 = [stasjon[0].antall,stasjon[1].antall,stasjon[2].antall]
	visStolpediagram(atxt,bot3,'Stasjoner med færrest turstart','orange','blue','black',12,'innside')

	// Tegner stasjoner med flest turer
	tegnBrukSynsfelt(0.51,0.90,0.05,0.45); // Høyre nedre synsfelt
	i0 = stasjon.length-3
	atxt = [stasjon[i0].st_navn,stasjon[i0+1].st_navn,stasjon[i0+2].st_navn]
	top3 = [stasjon[i0].antall,stasjon[i0+1].antall,stasjon[i0+2].antall]
	visStolpediagram(atxt,top3,'Stasjoner med flest turstart','lightgreen','blue','black',12,'innside')
	
}
function visStolpediagram(merkelapp, frekvenser, tittel='tittel',stolpefarge='lightblue',
						  tittelfarge='blue',tekstfarge='black',tekststørrelse=12,plassering='under'){

	let bredde = 0.65;     // Stolpebredde
	let luftb   = 1-0.65;  // Luft mellom stolpene
	x1 = 0
	x2 = x1 + frekvenser.length*bredde + (frekvenser.length+1)*luftb 
	tegnBrukXY(x1,x2,0,max(frekvenser)*1.20)    // Verdenskoordinater
	tegnRektangel(x1,0,x2-x1,max(frekvenser)*1.20,'grey') // Ramme rundt diagramområdet
	
	let høyde, lufth = (max(frekvenser)*1.20)*0.02; // 2% luft for søyletekst
	for ( let i=0 ; i < frekvenser.length; i++){ 
		høyde  = frekvenser[i];
		xs     = i+luftb   // Startpos for hver stolpe
		tegnFyltRektangel(xs,0,bredde,høyde, stolpefarge);
		tegnRektangel    (xs,0,bredde,høyde,'black');
		tegnTekst(høyde,       xs+0.5*bredde,høyde+lufth,tekstfarge,0,'center',tekststørrelse,'Calibri','bottom');
		
		if (plassering =='under'){
		tegnTekst(merkelapp[i],xs+0.5*bredde,0-lufth,tekstfarge,0,'center',tekststørrelse,'Calibri','top');
		}
		else if (plassering == 'innside'){
			tegnTekst(merkelapp[i],xs+0.5*bredde,høyde/2,tekstfarge,-90,'center',tekststørrelse,'Calibri','middle');
		}
	}
	tegnTittel(tittel,tittelfarge,tekststørrelse+4,'Arial');
}
function sorterStasjoner(a,b){ // Sorterer lav til høy basert på antall i objektet
	return a.antall - b.antall;
}