include('regression.js') // Importerer et 3dje-parts bibliotek (se API-siden i Fulab)
//--- Hovedprogrammet i winInit kjøres når siden er ferdiglasta
window.onload = winInit;  

function winInit(){ // Hovedprogrammet
	tegnBrukCanvas("canvas"); // Kobler canvas i html sammen med Fusions tegnepakke
	elGetId("canvas").onclick = vedMusklikk;          // Funksjon kobles til musklikk 
	let [width,height] = tegnHentPixGeometri(); 
	elGetId('meldinger').style.width = width+'px';
	regresjon()  // Utfører regresjonen
	print('Klikk med musa på grafen') // Fra Fusion. Skriver i textarea med id='meldinger'
}

function regresjon() {
	// Eksempel med polynomregresjon. 
	// Data over normaltempereatur (Celsius) på Røros

	include('regression.js') // Importerer et 3dje-parts bibliotek (se Fulabs API-side)

	mnd  = [1,2,3,4,5,6,7,8,9,10,11,12] // Månedsnummer
	temp = [-11.2,-9.7,-5.6,-0.7,5.6,10.1,11.4,10.4,6.1,1.7,-5.2,-9.2] // Temperatur

	// Tegner datasettet. Se API for info om tegnefunksjoner
	tegnBrukXY(1,12,-15,15)
	tegnAkser('Måned','Temperatur',0,1)
	tegnMarkørliste(mnd,temp,'sirkel','blue',7)

	koeffisienter = regPolynom(mnd,temp,3)     // 3. grad Høyeste orden først (API/Regresjon)
	koeffisienter = listReverse(koeffisienter) // Reverserer lista (API/Lister)
	tegnPolynom(koeffisienter,'red') // Laveste orden først
	printListe('Koeffisienter 3.grad:', koeffisienter,3)

	// Regresjon polynom grad 4
	koeffisienter = regPolynom(mnd,temp,4)     // 4.grad
	koeffisienter = listReverse(koeffisienter)
	tegnPolynom(koeffisienter,'green')
	printListe('Koeffisienter 4.grad:', koeffisienter,3)

	// Annotering
	tegnTittel('Normaltemperatur på Røros')
	tegnTekst('3.grad',10,12,'red')
	tegnTekst('4.grad',10,10,'green')
}

function vedMusklikk(event){ // Nettlese
	let xp = event.offsetX
	let	yp = event.offsetY
	let [xv,yv] = tegnPix2V(xp,yp) // Verdenskoordinater fra pikselkoordinater
	print('Punkt:', '('+xv.toFixed(2)+','+ yv.toFixed(2) +')' ); // Skriver i textarea
}