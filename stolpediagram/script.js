let tittel   = 'Karakterer klasse 10A'
let karakter = [ 1,2,3,4,5,6 ]   // Tekst under stolpene
let antall   = [ 1,3,8,10,6,2 ]   // Frekvenser/antall elever for hver karakter

//--- Hovedprogrammet i winInit kjøres når siden er ferdiglasta
window.onload = winInit;  

function winInit(){ // Hovedprogrammet
	tegnBrukCanvas("canvas"); // Kobler canvas i html sammen med Fusions tegnepakke
	elGetId("canvas").onclick = vedMusklikk;          // Funksjon kobles til musklikk 
	let width = elGetId("canvas").width
	elGetId('meldinger').style.width = width+'px';
	
	tegnBrukBakgrunn('lightyellow')
	visStolpediagram(karakter,antall,'lightblue',tittel)
}

function visStolpediagram(merkelapp, frekvenser, farge='lightblue',tittel=''){
	tegnBrukXY(1,frekvenser.length+1,0,max(frekvenser)*1.20)
	bredde = 0.75
	for ( var i=0 ; i<len(frekvenser); i=i+1){ 
		høyde  = frekvenser[i];
		tegnFyltRektangel(i+1,0,bredde,høyde, farge)
		tegnRektangel    (i+1,0,bredde,høyde,'black')
		tegnTekst(høyde,i+1+0.325,høyde)
		tegnTekst(merkelapp[i],i+1+0.325,-0.6)
	}
	tegnTittel(tittel,'black',20,'Arial')
}

function vedMusklikk(event){ 
	let xp = event.offsetX
	let	yp = event.offsetY
	let [xv,yv] = tegnPix2V(xp,yp) // Verdenskoordinater fra pikselkoordinater
	let index = Math.floor(xv)-1
	clearprint()
	if (index >= 0 && index < karakter.length){
		print(antall[index],'elever fikk karakteren ',index+1)
	}
	else { 
		print('Punkt:', '('+xv.toFixed(2)+','+ yv.toFixed(2) +')' );
	}
}