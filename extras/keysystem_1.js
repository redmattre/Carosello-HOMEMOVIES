//ngrok subdomain command: ngrok http --domain=thiscouldbeustelecomando.ngrok.dev 7776

autowatch = 1;
outlets = 2;

var numberOfScreens = jsarguments[1]; //quanti schermi, decidi da fuori
var keys = [];
var autoDisconnectTime = 600000; //10 minuti di sessione
var screenAssignments = {};
var screenCounter = 0;
var assignedScreens = [];

function connect(a) 
{
    var key = a;

    if (!isKeyInArray(key, keys)) {
        keys.push(key);
        assignScreen(key);
    }

    post("utenti connessi: " + keys.length + "\n");
    outlet(1, keys.length);
    
    //scollegamento automatico di sicurezza
    var tsk = new Task(disconnect, this, key); 
    tsk.schedule(autoDisconnectTime);
}

function disconnect(a) 
{
    var key = a;

    var index = findKeyIndex(key, keys);
    if (index !== -1) {
        keys.splice(index, 1);
        removeScreenAssignment(key);
    }

    post("utenti connessi: " + keys.length + "\n");
    outlet(1, keys.length);
}

function cmd(a, b, c) 
{
    var key = a;
    var gesture = b;
    var velocity = c;
    
    var screenNumber = getScreenNumber(key);
    outlet(0, gesture + " " + screenNumber + " " + velocity); //al contrario per la priorità di max
}

// Funzione per verificare se una chiave è presente nell'array
function isKeyInArray(key, keys) {
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] === key) {
            return true;
        }
    }
    return false;
}
// Funzione per trovare l'indice di una chiave nell'array
function findKeyIndex(key, keys) {
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] === key) {
            return i;
        }
    }
    return -1;
}

function assignScreen(key) 
{
    var screenNumber;
    if (screenCounter < numberOfScreens) {
        screenNumber = chooseRandomScreen();
        assignedScreens.push(screenNumber);
    } else {
        screenNumber = assignedScreens[screenCounter % numberOfScreens];
    }

    screenAssignments[key] = screenNumber;
    screenCounter++;
}


function removeScreenAssignment(key) 
{
    delete screenAssignments[key];
}

function getScreenNumber(key) 
{
    return screenAssignments[key] || 0;
}

function getAvailableScreens() 
{
    var allScreens = [];
    for (var i = 1; i <= numberOfScreens; i++) {
        var isAssigned = false;
        for (var j = 0; j < assignedScreens.length; j++) {
            if (assignedScreens[j] === i) {
                isAssigned = true;
                break;
            }
        }
        if (!isAssigned) {
            allScreens.push(i);
        }
    }
    return allScreens;
}

function chooseRandomScreen() 
{
    var availableScreens = getAvailableScreens();
    var randomIndex = Math.floor(Math.random() * availableScreens.length);
    return availableScreens[randomIndex];
}

function debu() 
{
    post("chiavi: " + keys + "\n");
    post("utenti connessi: " + keys.length + "\n");
    post("schermi assegnati: " + assignedScreens + "\n");
}

function clear() 
{
    keys = [];
    numStoreKeys = 0;
}