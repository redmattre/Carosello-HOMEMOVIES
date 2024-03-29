autowatch = 1;

/*
timestretch (da 0.5 a 1.5), (pitch da -50 a 50) => forse sono un po' too much (i valori andranno tarati)
fadetime (da 1000 a 30000) => poco 1 s di transizione
specGate (da 0. a 60.)
randPhase (da -5 0 a 5) => per i due effetti capire se mettere dei gate out perchè non possono essere
sempre engaged and interpolated
*/

//CAMBIA I FADE TIME (+LUNGHI)

function bilinearInterpolation(x, y) 
{   
    var bottomLeft = [1., 0., 5000]; //pochi utenti, poca interazione
    var bottomRight = [0.8, -300., 10000]; //molti utenti, poca interazione
    var topLeft = [1.5, 150., 10000]; //pochi utenti, molta interazione
    var topRight = [1.25, 150, 20000]; //molti utenti, molta interazione
    
    var interpolatedValue = [];
    for (var i = 0; i < bottomLeft.length; i++) {
      var bottom = bottomLeft[i] * (1 - x) + bottomRight[i] * x;
      var top = topLeft[i] * (1 - x) + topRight[i] * x;
      interpolatedValue[i] = bottom * (1 - y) + top * y;
    }

    outlet(0, interpolatedValue);
}
  