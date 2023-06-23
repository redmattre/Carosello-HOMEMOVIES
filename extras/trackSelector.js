/*
come funziona questo algo:
- riempie l'array con tutti i nomi della cartella con aCatalogo (lanciato da fuori)
- confronta quello che gli arriva come traccia ideale con quello che c'è nella cartella
- appena trova un match lo manda "fuori" (dicendoti a quale indice comincia il nome)

come dovrebbe funzionare da qui in poi:
- questa cosa che viene fuori la dovresti togliere dall'array principale belloarray (così che non venga fuori più)
- dovresti riattaccarci il numero perchè è identificativo della traccia
- dovresti attaccarci .wav e mandarlo fuori per prendere dalla cartella

in realtà facendo così l'ordine sarebbe sempre lo stesso, però:
- se quello che viene fuori lo metti in un array temporaneo insieme a tutti i possibili match e poi 
scegli a caso da quello effettivamente ti ritrovi sempre con qualcosa di diverso
- a quel punto devi ricordarti il puntatore originale (il numero identificativo della traccia)
e toglierlo dall'array principale

NOTA: array principale non è bello array ma è "tracks"

NOTA: sarebbe più intelligente rimettere dentro tracks non tutto ma solo quelle che hai tolto
che potresti mettere in un array differente
*/

autowatch = 1;
outlets = 2;

var tracks = [];
var tracksLocked = [];

function aCatalogo() //riempi da fuori
{
    belloarray = [];
    belloarray = arrayfromargs(arguments);
    tracks.push.apply(tracks, belloarray);
    tracks.push.apply(tracksLocked, belloarray);
    //post(tracks+"\n");
}

var possibiliMatch = [];
var counter = 0;

function getTrack()
{
    var chosen = null;
    var bool = null;
    var flagNoMatch = 0; //all'inizio è zero perchè ci saranno sicuro dei match
    var tracciaideale = [];
    var tracciaideale = arrayfromargs(arguments);
    //tracciaideale.push.apply(tracciaideale, arrayin);

    //post("tracks = "+tracks+"\n");

    //post("tracciaideale = " + tracciaideale+"\n");

    for (var i=0; i < tracks.length;) 
    {
        //post("primo elemento di tracks = "+tracks[0]+"\n");
        var tempArr = [tracks[i+1], tracks[i+2], tracks[i+3], tracks[i+4]];
        //post("tempArr = " + tempArr+ "\n");
        bool = confrontaArray(tracciaideale, tempArr);
        //post("bool = " + bool +"\n");

        if (bool == 1) 
        {
            //var output = tempArr.unshift(tracks[i]);
            //post("output = " + output +"\n");
            possibiliMatch.push(i);
            //post("fuori => " + output +"\n");
            //break; //se li vuoi guardare tutti questa cosa da non fare
            chosen = getRandomIndex(possibiliMatch); //ne prende uno a caso tra quelli possibili
            //post("possibili indici di match: "+possibiliMatch+"\n");
            //post("chosen one: "+chosen+"\n");
        } else {
            //post("ERROR: no match found!"+"\n");
        }

        i = i+5;
    }

    if (possibiliMatch.length == 0)
    {
        tracks = [];
        tracks = tracksLocked.slice();
        //post("possibili match lunghezza è 0!");
        //getTrack(); //non capisco perchè questo da problemi: provo a fare richiamare da fuori
        outlet(1, "getTrack "+ tracciaideale[0]+" "+ tracciaideale[1]+" "+ tracciaideale[2]+" "+ tracciaideale[3]);
    } else {
        var trackname = takeElements(tracks, chosen, 5);

        
        trackname.unshift(counter);
        counter++;
        if (counter >= 4) 
        {
            counter = 0;
            //post("resetto il counter!"+ counter+"\n");
        }
        
        outlet(0, trackname);
    }

    possibiliMatch = []; //pulisci SEMPRE prima di richiamare la funzione
}


function confrontaArray(arr1, arr2) {
    if (arr1.length !== arr2.length) 
    {
        //post("lunghi diversi"+"\n");
        return 0; // Gli array hanno lunghezze diverse, quindi sono diversi
    }
    
    for (var i = 0; i < arr1.length; i++) 
    {
      if (arr1[i] !== arr2[i]) 
      {
        //post("agli stessi indici elementi diversi"+"\n");
        return 0; // Gli elementi agli stessi indici sono diversi, quindi gli array sono diversi
      }
    }
    
    return 1; // Gli array sono uguali
}

function getRandomIndex(arr) 
{
    var randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function takeElements(array, index, count) 
{
    var extractedElements = array.splice(index, count);
    return extractedElements;
}

function clear() 
{
    tracks = [];
    tracciaideale = [];
}

function vision() 
{
    post("tracks = "+tracks+"\n");
}

