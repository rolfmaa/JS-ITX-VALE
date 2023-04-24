// Norsk mediebarometer. Data fra fila norskMediebarometer.csv.
// Koden er lagd slik at den kan lese automatisk fra en server, men også la brukeren
// lese inn ei tilsvarende fil ved å interaktivt velge og laste inn fra mappe på egen datamaskin.

// Globale variabler for bruk i flere funksjoner deklareres:
let data = []; // 2D-tabell for HTML-visning
let overskrift = []; // Overskrift i HTML-tabellen

let aarstall = [];
let minTV = [], minInternett=[], minRadio= []; // Arrayer for grafisk fremvisning,

window.onload = winInit ;   // Når nettsiden er ferdig lasta kjøres funksjonen winInit

function winInit(){ // 
	tegnBrukCanvas("canvas"); // Kobler sammen canvas med tegnepakka
	elGetId("valgtCSV").onchange  = csvInput; // Funksjonen som mottar innholdet etter innlesing
	lesFil('norskMediebarometer.csv')
	visCSVdata(); // For grafisk visning
	visTabellHTML(); // For visning i HTML-tabell
}
//
// De neste tre funksjonene kan brukes ved innlesing av fil fra en server.
// Direkte innlesing fra serverfil løses med async og await.
// Legg merke til JQuery biblioteket som er inkludert i HTML (nødvendig i funksjonen sjekkFilServer )
// Og at det er bare er funksjonen csvAnalyser som er spesifikk for dette datasettet.
//
async function lesFil(filnavn) { // Prosess: sjekk, les inn, analyser
	if (sjekkFilServer(filnavn)){ 
		try {
			let filinnhold = await lastInn(filnavn);
			csvAnalyser(filinnhold); // Analyserer filas innhold
		} catch (error) {
			console.error('Error:', error.message);
		}
	}
	else {
		alert('Fant ikke fila :'+filnavn)
		return false
	}
}
function lastInn(file) { // Laster inn filinnholdet fra fila
    return fetch(file).then((response) => response.text() );
}
function sjekkFilServer(url){ // Sjekker om angitt fil finnes på server
	var http = jQuery.ajax({
        type:"HEAD", 
        url: url,
        async: false
    })
    return http.status!=404; // Blir true eller false
}
//
// Så kommer hjelpefunksjoner for å analysere datasettet og vise innholdet grafisk i canvas
//
function csvInput(){ // Funksjon om knyttes til innlesingsknappen for CSV
	let file = this.files[0]; // Objektet som lagre informasjonen etter fil-inn dialogen
	let reader = new FileReader();
	reader.onload = function(evt) {
					let csvdata = evt.target.result;
					csvAnalyser(csvdata);  // Analyserer filas innhold.
				    };
	reader.readAsText(file);
}
function csvAnalyser(innhold){ // Behandler CSV-data og presenterer datasettet
	let linjer = [], felt = [];
	linjer = innhold.split('\n');
	overskrift = linjer[1].split(';');
    // To første linjene er overskrifter
	for (let i = 2; i < linjer.length; i++){
		linjer[i] = linjer[i].replace('\r','');
		felt = linjer[i].split(';');
		data.push(felt);
		aarstall.push( parseInt(felt[0]) );
		minTV.push( parseInt(felt[1]) );
		minInternett.push(parseInt(felt[2]));
		minRadio.push(parseInt(felt[3]));
	}

	visCSVdata(); // Grafisk fremvisning  
	visTabellHTML(); // HTML-visning

}
function visCSVdata(){ // Plottefunksjonen
	tegnTittel('Gjennomsnittsdag forskjellige medier')
    tegnBrukXY(2000,2021,0,max(minTV,minInternett,minRadio)*1.20)
	tegnKurve(aarstall,minTV,'red')
	tegnKurve(aarstall,minInternett,'green')
	tegnKurve(aarstall,minRadio,'blue')
	tegnForklaring(['TV','Internett','Radio'],['red','green','blue'])
	tegnAkser('År','Minutter',0,0)
}
function visTabellHTML(){ // Benytter funksjon i mappa kodebiblioteker. Se kildekode.
	elCreateTable("datatabell",overskrift,data)
}