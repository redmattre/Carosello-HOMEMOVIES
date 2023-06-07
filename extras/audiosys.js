autowatch = 1;

var tracks = jsarguments[1]; //con quante tracce funziona il sistema
var tags = jsarguments[2]; //quanti tag per il suono
var screens = jsarguments[3]; //quanti schermi
inlets = screens;
var keywords = ["gesture", "texture", "small", "big", "deep", "sfondo"];
var keywordCounts = [];
var activeVids = [];

var slot0 = [];
var slot1 = [];
var slot2 = [];
var slot3 = [];
var slot4 = [];
var slot5 = [];

function loadtoActiveVids() 
{

    var temporary = [];
    temporary = arrayfromargs(arguments);

    var unusedelements = (temporary.length) - tags;
    temporary.splice(0, unusedelements);

    switch (inlet) 
    {
        case 0:
            slot0 = [];
            slot0 = temporary;
            break;
        case 1:
            slot1 = [];
            slot1 = temporary;
            break;
        case 2:
            slot2 = [];
            slot2 = temporary;
            break;
        case 3:
            slot3 = [];
            slot3 = temporary;
            break;
        case 4:
            slot4 = [];
            slot4 = temporary;
            break;
        case 5:
            slot5 = [];
            slot5 = temporary;
            break;
    }

    activeVids = [];
    activeVids = activeVids.concat(slot0, slot1, slot2, slot3, slot4, slot5);

    post("sono andato avanti" + "\n");

    countKeywords();

    outlet(0, keywordCounts);
}

function countKeywords() 
{
    // Create an object to store the counts
    keywordCounts = [];

    //inizializza le posizioni
    for (var i = 0; i < keywords.length; i++) 
    {
        keywordCounts[i] = 0;
    }

    for (var i=0; i<activeVids.length; i++) 
    {
        for (var j=0; j<keywords.length;j++) 
        {
            var keyword = keywords[j];

            if (activeVids[i] === keyword) 
            {
                keywordCounts[j]++;
            }
        }
    }
    
}

//da qui in poi alcuni numeri sono hardcoded (per esempio la cosa dei 2 tag) sopra sono parametrici

function getTrack() 
{
    var firstTwoIndexes = getRandomIndicesByPairs(keywordCounts); //questo mi dovrebbe dare come risultato un array di due numeri che sono il vero o falso dei primi due indici
    //post("gesture or texture?: " + stampa + "\n");

    //qui c'è da costruire tutto il pippone per le altre caratteristiche (spettro, dinamica);

    

}

var totalWeight = screens;

function getRandomIndicesByPairs(inputArray) 
{
    var resultArray = [];
    for (var i = 0; i < inputArray.length; i += 2) {
      var weight1 = inputArray[i];
      var weight2 = inputArray[i + 1];
      var totalWeight = weight1 + weight2;
  
      var randomValue = Math.random() * totalWeight;
      var selectedIndex;
      if (randomValue < weight1) {
        selectedIndex = i;
      } else {
        selectedIndex = i + 1;
      }
  
      resultArray.push(selectedIndex);
    }

    var keysArray = [];

    for (var j = 0; j < resultArray.length; j++) 
    {
        keysArray.push(keywords[resultArray[j]]);
    }

    if (resultArray[0]) 
    {
        keysArray.splice(1, 1);
    } else {
        keysArray.splice(2, 1);
    }
  
    return keysArray;
}  

function vision() 
{
    post("video attivi: " + activeVids + "\n");
    post("il sistema lavora con " + tracks + " tracce e " + tags + " tag" + "\n");

    post("gesture = " + keywordCounts[0] + "\n");
    post("texture = " + keywordCounts[1] + "\n");
    post("small = " + keywordCounts[2] + "\n");
    post("big = " + keywordCounts[3] + "\n");
    post("deep = " + keywordCounts[4] + "\n");
    post("sfondo = " + keywordCounts[5] + "\n");

    post("schermo 1 = " + slot0 + "\n");
    post("schermo 2 = " + slot1 + "\n");
    post("schermo 3 = " + slot2 + "\n");
    post("schermo 4 = " + slot3 + "\n");
    post("schermo 5 = " + slot4 + "\n");
    post("schermo 6 = " + slot5 + "\n");
}

function reset() 
{
    keywordCounts = [];
    activeVids = [];

    slot0 = [];
    slot1 = [];
    slot2 = [];
    slot3 = [];
    slot4 = [];
    slot5 = [];

    countKeywords();

    outlet(0, keywordCounts);
}