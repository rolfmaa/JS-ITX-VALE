include('https://fulab.no/fulibs/turtle.js') // Importerer et 3dje-parts bibliotek (se API-siden i Fulab)
//--- Hovedprogrammet i winInit kjøres når siden er ferdiglasta
window.onload = winInit;  

function winInit(){ // Hovedprogrammet
	tegnBrukCanvas("canvas"); // Kobler canvas i html sammen med Fusions tegnepakke
	elGetId("canvas").onclick = vedMusklikk;          // Funksjon kobles til musklikk 
	let [width,height] = tegnHentPixGeometri(); 
	elGetId('meldinger').style.width = width+'px';
	turtleplot()   
	print('Pythonpakka Turtle med JavaScript')  
}

function turtleplot() {

	bgcolor('lightgrey')
	farger = ['black','grey','orange','magenta','red','olive','green','lightblue']
	setworldcoordinates(-200,-200,200,200)
	
	antall = 400
	vinkel = 89.5
	for (let i= 0; i < antall; i++){ 
		j = randint(0,len(farger)-1)
		color(farger[j] )
		forward(i)
		left(vinkel)
	}
}

function vedMusklikk(event){ // Nettlese
	let xp = event.offsetX
	let	yp = event.offsetY
	let [xv,yv] = tegnPix2V(xp,yp) // Verdenskoordinater fra pikselkoordinater
	print('Punkt:', '('+xv.toFixed(2)+','+ yv.toFixed(2) +')' ); // Skriver i textarea
}