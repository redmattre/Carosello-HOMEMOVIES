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
*/

autowatch = 1;

var tracks = [];

function aCatalogo() //riempi da fuori
{
    belloarray = [];
    belloarray = arrayfromargs(arguments);
    tracks.push.apply(tracks, belloarray);
    //post(tracks+"\n");
}

function getTrack()
{
    tracciaideale = [];
    tracciaideale = arrayfromargs(arguments);
    //tracciaideale.push.apply(tracciaideale, arrayin);

    post("tracks = "+tracks+"\n");

    post("tracciaideale = " + tracciaideale+"\n");

    for (var i=0; i < tracks.length;) 
    {
        //post("primo elemento di tracks = "+tracks[0]+"\n");
        var tempArr = [tracks[i+1], tracks[i+2], tracks[i+3], tracks[i+4]];
        //post("tempArr = " + tempArr+ "\n");
        var bool = confrontaArray(tracciaideale, tempArr);
        //post("bool = " + bool +"\n");

        if (bool == 1) 
        {
            var output = tempArr.unshift(tracks[i]);
            //post("output = " + output +"\n");
            //post("fuori => " + output +"\n");
            break;
        } else {
            post("ERROR: no match found!"+"\n");
        }

        i = i+5;
    }

}
//cane

function confrontaArray(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        post("lunghi diversi"+"\n");
        return 0; // Gli array hanno lunghezze diverse, quindi sono diversi
    }
    
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        post("agli stessi indici elementi diversi"+"\n");
        return 0; // Gli elementi agli stessi indici sono diversi, quindi gli array sono diversi
      }
    }
    
    return 1; // Gli array sono uguali
}

function clear() 
{
    tracks = [];
    tracciaideale = [];
}

