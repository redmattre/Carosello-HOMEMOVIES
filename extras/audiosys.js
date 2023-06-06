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