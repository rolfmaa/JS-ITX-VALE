//--- Mal for tegning i canvas.
//--- Tegning kan utføres direkte i Canva eller via Fusions tegneapier

//--- Deklarasjon av GLOBALE variabler for programmet
var bgcol = 'white';
//--- Hovedprogrammet i winInit kjøres når siden er ferdiglasta
window.onload = winInit;  

function winInit(){ // Hovedprogrammet
	tegnBrukCanvas("canvas"); // Kobler canvas i html sammen med Fusions tegnepakke	 
	visGrafMatplotlib()
}

function visGrafMatplotlib(){  // Tegner i canvas med tegnepakke.js. Pakka har en overbygning for tegning i verdenskoordinater.
	let xdata = linspace(-2*Math.PI,+2*Math.PI,150);
	let ydataSin = [];
	let ydataCos = [];
	for (var i = 0; i<xdata.length;i++){
		ydataSin[i] = Math.sin(xdata[i])
		ydataCos[i] = Math.cos(xdata[i])
	}
	subplot(2,1,1)
	plot(xdata,ydataCos,'cos(x)');
	title('Matplolib med JavaScript');
	show();
	
	subplot(2,1,2)
	plot(xdata,ydataSin,'sin(x)');
	show();
}
