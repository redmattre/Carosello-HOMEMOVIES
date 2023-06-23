autowatch = 1;
outlets = 2;

var tracks = jsarguments[1]; //con quante tracce funziona il sistema
var tags = jsarguments[2]; //quanti tag per il suono
var screens = jsarguments[3]; //quanti schermi
inlets = screens;
var keywords = ["gesture", "texture", "small", "big", "deep", "sfondo"];
var keywordCounts = [];
var activeVids = [];

var vslot0 = [];
var vslot1 = [];
var vslot2 = [];
var vslot3 = [];
var vslot4 = [];
var vslot5 = [];

function loadtoActiveVids() //funzione che viene chiamata ad ogni nuova gesture
{

    var temporary = [];
    temporary = arrayfromargs(arguments);

    var unusedelements = (temporary.length) - tags;
    temporary.splice(0, unusedelements);

    switch (inlet) 
    {
        case 0:
            vslot0 = [];
            vslot0 = temporary;
            break;
        case 1:
            vslot1 = [];
            vslot1 = temporary;
            break;
        case 2:
            vslot2 = [];
            vslot2 = temporary;
            break;
        case 3:
            vslot3 = [];
            vslot3 = temporary;
            break;
        case 4:
            vslot4 = [];
            vslot4 = temporary;
            break;
        case 5:
            vslot5 = [];
            vslot5 = temporary;
            break;
    }

    activeVids = [];
    activeVids = activeVids.concat(vslot0, vslot1, vslot2, vslot3, vslot4, vslot5);

    //post("sono andato avanti" + "\n");

    countKeywords();

    checkEquilibrium();
    //se è cambiato l'equilibrio prendi una nuova traccia altrimenti niente
    if (equilibrioTF) 
    {
        getTrack();
    }

    outlet(0, keywordCounts);
    outlet(1, "gesture"); //butta fuori ogni volta che c'è una gesture
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

/*
con questa configurazine il video cambia anche se sono uguali (equilibrio = 2), 
potrebbe essere troppo spesso ma non per forza, nel caso basta aggiungere una percentuale 
all'assegnazione del true or false quando sono uguali (tipo 50 e 50 o una custom).
*/


var equilibrio;
var equilibrioTF = false;

function checkEquilibrium() 
{

    var storeToConfront = equilibrio;
    var gestures = keywordCounts[0];
    var textures = keywordCounts[1];
    post("equilibrio prima del check = " + storeToConfront + "\n");
    post("numero di gesture = " + gestures + "\n");
    post("numero di texture = " + textures + "\n");

    if (gestures > textures) 
    {
        equilibrio = 0;
        if (storeToConfront != equilibrio) 
        {
            equilibrioTF = true;
        } else {
            equilibrioTF = false;
        }

        post("equilibrio dopo il check = " + equilibrio + "\n");

    } else if (gestures < textures) {
        equilibrio = 1;
        if (storeToConfront != equilibrio) 
        {
            equilibrioTF = true;
        } else {
            equilibrioTF = false;
        }

        post("equilibrio dopo il check = " + equilibrio + "\n");

    } else {
        equilibrio = 2;
        equilibrioTF = true;

        post("equilibrio dopo il check = " + equilibrio + "\n");

    }


}


//da qui in poi alcuni numeri sono hardcoded (per esempio la cosa dei 2 tag) sopra sono parametrici (ma anche per forza perchè ho deciso di mettere questa cosa degli slot)

var spectrum_ = [];
var dynamics_ = [];
var dynamics = ["forte", "piano"]; //forte e piano (f, p)
var spectrum = ["bright", "dark"]; //dark e bright (b, d)
var numberOfTracks = 4; //costante che si può prendere da fuori

/*
function mixAlgo() 
{
    var dynamicsSum = dynamics_.reduce(add, 0);
  
    if (dynamics_.length >= numberOfTracks) {
      if (dynamicsSum > numberOfTracks / 2) {
        for (var i = 0; i < dynamics_.length; i++) {
          if (dynamics_[i] == 1) {
            dynamics_.splice(i, 1);
          }
        }
      } else {
        for (var i = 0; i < dynamics_.length; i++) {
          if (dynamics_[i] == 0) {
            dynamics_.splice(i, 1);
          }
        }
      }
    }
  
    if (dynamicsSum == numberOfTracks - 1) {
      dynamics_.push(0);
    } else {
      var binRandom = Math.floor(Math.random() * 2); // 0 or 1
      dynamics_.push(binRandom);
    }
  
    var spectrumSum = spectrum_.reduce(add, 0);
  
    if (spectrum_.length >= numberOfTracks) {
      if (spectrumSum > numberOfTracks / 2) {
        for (var i = 0; i < spectrum_.length; i++) {
          if (spectrum_[i] == 1) {
            spectrum_.splice(i, 1);
          }
        }
      } else {
        for (var i = 0; i < spectrum_.length; i++) {
          if (spectrum_[i] == 0) {
            spectrum_.splice(i, 1);
          }
        }
      }
    }
  
    if (spectrumSum == numberOfTracks - 1) {
      spectrum_.push(0);
    } else {
      var binRandom = Math.floor(Math.random() * 2); // 0 or 1
      spectrum_.push(binRandom);
    }
  
    var dynamicsStrings = [];
    var spectrumStrings = [];
  
    for (var i = 0; i < dynamics_.length; i++) {
      dynamicsStrings.push(dynamics[dynamics_[i]]);
    }
  
    for (var i = 0; i < spectrum_.length; i++) {
      spectrumStrings.push(spectrum[spectrum_[i]]);
    }

    //post("quante tracce = " + spectrum_.length + " " + dynamics_.length + "\n");
  
    post("mix balance: " + dynamicsStrings + " " + spectrumStrings + "\n");

}
*/

//var outputArray = [];
//var counter = 0;
var mixDynamics = [];
var mixSpectrum = [];

function getTrack() //funzione chiamata ogni volta che serve una nuova traccia
{
    /*
    if (counter < 3) 
    {
        counter++;
    } else {
        counter = 0;
    }
    */

    var mood = getRandomIndicesByPairs(keywordCounts);

    //0 o 1
    var binRandom1 = Math.floor(Math.random() * 2);
    mixDynamics.push(binRandom1);
    var binRandom2 = Math.floor(Math.random() * 2);
    mixSpectrum.push(binRandom2);
    

    binRandom1 = dynamics[binRandom1];
    binRandom2 = spectrum[binRandom2];

    var output = [mood[0], mood[1], binRandom1, binRandom2];

    if (mixDynamics.reduce(add, 0) >= 3) 
    {
        //flip everything the other way
    }

    if (mixSpectrum.reduce(add, 0) >= 3) 
    {
        //flip everything the other way (quindi sparane quattro?)
    }

    var output = [mood[0], mood[1], binRandom1, binRandom2]; //da distribuire

    outlet(1, output);

    // hai un array con quali caratteristiche dovrebbero avere le 4 tracce quindi devi prendere in base a quello
}

function add(accumulator, a) 
{
    return accumulator + a;
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

    post("schermo 1 = " + vslot0 + "\n");
    post("schermo 2 = " + vslot1 + "\n");
    post("schermo 3 = " + vslot2 + "\n");
    post("schermo 4 = " + vslot3 + "\n");
    post("schermo 5 = " + vslot4 + "\n");
    post("schermo 6 = " + vslot5 + "\n");
}

function reset() 
{
    keywordCounts = [];
    activeVids = [];

    vslot0 = [];
    vslot1 = [];
    vslot2 = [];
    vslot3 = [];
    vslot4 = [];
    vslot5 = [];

    countKeywords();

    outlet(0, keywordCounts);
}