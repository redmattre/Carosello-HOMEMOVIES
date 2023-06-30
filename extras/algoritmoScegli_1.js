autowatch = 1;

inlets = 1;
outlets = 2;

var numTags = jsarguments[1]; //numero di tag con cui funziona il sistema (lo setti da fuori)

var allVids = []; //array con metadati di tutti i video 
var allVidslocked = []; //array con metadati di tutti i video (non modificabile)
var primeVid = []; //primo video e poi video principale
var compArray = []; //array con i valori di comparazione per ogni video
var stringPath; //variabile dove c'è una stringa che indica la cartella video (serve per ricostruire url file)

function assegnaPrimoVid() //da fare dopo aver preso la cartella (arriva da fuori)
{
	primeVid = [];
	primeVid = arrayfromargs(arguments);
	allVidslocked = [].concat(allVids); //fai una copia di tutto quello che 
	outlet(0, primeVid + ".mov")
	comparaVid();
	//post("init!" + "\n");
}

function catalogo() //funzione "loop" esterna, viene loopata dall'uzi fuori IMPORTANTE
{
	var metadataCurrentVid = [];
	var metadataCurrentVid = arrayfromargs(arguments);
	allVids.push.apply(allVids, metadataCurrentVid);
}

function comparaVid()
{
	var nVideos = (allVids.length) / numTags; //FORSE è QUI L'ERRORE
	var indiceInitVid = 0;

	compArray = []; //resetta il comparray!
	//post("ho resettato il compArray" + "\n");
	
	for (var i=0; i < nVideos; i++) //per tutta la lunghezza dell'Array allVids
	{
		var slicedArray = [];
		
		for (var e=0; e < numTags; e++) 
		{
			slicedArray.push(allVids[indiceInitVid + e]); //carica 4 valori
		}
		
		var diffArray = [];
		
		diffArray = primeVid.diff(slicedArray); //array con i valori uguali
		compArray.push(diffArray.length); //la lunghezza è la compatibilità da 0 a 4
		
		indiceInitVid = indiceInitVid + numTags; //aggiorna per prossimo video
	}
}

function scegliNewVid()
{
	var change_primeVid = false;
	var vidPool = [];
	var found = -1; // initialize with -1 to indicate no match found
	var bool_found = false;
	
	for (var i = 0; i < compArray.length; i++) 
	{
		if (compArray[i] == numTags) 
		{	
			var ran = Math.random();
			if (ran > 0.9) // 20% chance to be selected (adjust as needed)
			{
				vidPool.push(i);
			}
		} 
	}


	if (vidPool.length == 0) 
	{
		bool_found = false;
		for (var i = numTags - 1; i >= 0; i--) 
		{
			for (var j = 0; j < compArray.length; j++) 
			{
				if (compArray[j] == i) 
				{
					found = i;
					bool_found = true;
					break;
				}
			}
			if (bool_found) 
			{
				break;
			}
		}
	}

	if (allVids.length == numTags) //questo è il caso nel quale sia l'ultimo array (video)
	{
		bool_found = true;
		found = numTags;
		//post("alla frutta!" + "\n")
	}

	if (!bool_found) 
	{
		found = 0; // Set found to 0 for lowest compatibility
		bool_found = true;
	}

	if (found === 0) {
		for (var i = 0; i < compArray.length; i++) {
			if (compArray[i] === 0) {
				vidPool.push(i);
			}
		}
		change_primeVid = true; // Change primeVid if compatibility is too low
	} else if (found === numTags) {
		change_primeVid = true;
		allVids = [];
		allVids = [].concat(allVidslocked);
		vidPool.push(0); //metti dentro l'unico elemento rimasto (potrebbe non funzionare se è 0 o 1)
		post("giro di boa!" + "\n");
	} else {
		for (var i = 0; i < compArray.length; i++) {
			if (compArray[i] === found) {
				vidPool.push(i);
			}
		}
	}
	
	var indRan = randomNumber(vidPool.length);
	var punt_rand_compArray = vidPool[indRan];
	var puntatore_allVids = punt_rand_compArray * numTags;
	var output = [];
	
	for (var i = 0; i < numTags; i++) 
	{
		output.push(allVids[puntatore_allVids + i]);
	}
	
	compArray.splice(punt_rand_compArray, 1);
	allVids.splice(puntatore_allVids, numTags);
	
	outlet(0, output + ".mov");

	if (change_primeVid == true) //cambia prime vid se sei ad un livello di compatibilità molto basso
	{
		primeVid = []; //svuoti
		
		primeVid = [].concat(output);

		change_primeVid = false;

		comparaVid();

		post("è cambiato il primeVid!" + "\n");
	}
}


Array.prototype.diff = function(arr2) {
    var ret = [];
    this.sort();
    arr2.sort();
    for(var i = 0; i < this.length; i += 1) {
        if(arr2.indexOf(this[i]) > -1){
            ret.push(this[i]);
        }
    }
    return ret;
};

function randomNumber(massimo) 
{
	var num = Math.floor(Math.random()*massimo);
	return num;
}

function pathToAdd(a) 
{
	stringPath = a;
	post(stringPath + "\n");
}

function debugAll() 
{
	
post("allVids: ");
post (allVids + "\n");

post("primeVid: ")
post(primeVid + "\n");

post("compArray: ");
post(compArray + "\n");

post("allVidslocked: ");
post(allVidslocked + "\n");

}

/*
versione moddata con chat gpt per essere parametrica
*/