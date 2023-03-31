let tittel   = 'Karakterer klasse 10A';
let karakter = [ 1,2,3,4,5,6 ];   // Tekst under stolpene
let antall   = [ 1,3,8,10,6,2 ];   // Frekvenser/antall elever for hver karakter

//--- Hovedprogrammet i winInit kjøres når siden er ferdiglasta
window.onload = winInit;  

function winInit(){ // Hovedprogrammet
	tegnBrukCanvas("canvas"); // Kobler canvas i html sammen med Fusions tegnepakke
	elGetId("canvas").onclick = vedMusklikk;          // Funksjon kobles til musklikk 
	let width = elGetId("canvas").width;
	elGetId('meldinger').style.width = width+'px';
	
	tegnBrukBakgrunn('lightyellow');
	visStolpediagram(karakter,antall,tittel,'lightblue');
}

function visStolpediagramOLD(merkelapp, frekvenser, farge='lightblue',tittel=''){
	tegnBrukXY(1,frekvenser.length+1,0,max(frekvenser)*1.20)
	let bredde = 0.75;
	let høyde;
	for ( let i=0 ; i < frekvenser.length; i++){ 
		høyde  = frekvenser[i];
		tegnFyltRektangel(i+1,0,bredde,høyde, farge);
		tegnRektangel    (i+1,0,bredde,høyde,'black');
		tegnTekst(høyde,i+1+0.325,høyde);
		tegnTekst(merkelapp[i],i+1+0.325,-0.6);
	}
	tegnTittel(tittel,'black',20,'Arial');
}
function visStolpediagram(merkelapp, frekvenser, tittel='tittel',stolpefarge='lightblue',
						  tittelfarge='blue',tekstfarge='black',tekststørrelse=12,plassering='under'){

	let bredde = 0.65;     // Stolpebredde
	let luftb   = 0.65/2;  // Luft mellom stolpene
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

function vedMusklikk(event){ 
	let xp = event.offsetX;
	let	yp = event.offsetY;
	let [xv,yv] = tegnPix2V(xp,yp); // Verdenskoordinater fra pikselkoordinater
	let index = Math.floor(xv);
	clearprint();
	if (index >= 0 && index < karakter.length){
		print(antall[index],'elever fikk karakteren ',index+1);
	}
	else { 
		print('Punkt:', '('+xv.toFixed(2)+','+ yv.toFixed(2) +')' );
	}
}