autowatch = 1;

//timestretch (da 0.5 a 1.5), (pitch da -50 a 50) => forse sono un po' too much (i valori andranno tarati)

function bilinearInterpolation(x, y) 
{
    // Define the four corner values with random values between 0 and 1
    //è tutto ribaltato: (0, 0) è in alto a sinistra

    /*
    var topLeft = [0.5, 50]; //pochi utenti, molta interazione
    var topRight = [1.5, 50]; //molti utenti, molta interazione
    var bottomLeft = [0.5, -51]; //pochi utenti, poca interazione
    var bottomRight = [0.5, -50]; //molti utenti, poca interazione
    */

    
    var bottomLeft = [0.5, 50]; //pochi utenti, poca interazione
    var bottomRight = [1.5, 50]; //molti utenti, poca interazione
    var topLeft = [0.5, 50]; //pochi utenti, molta interazione
    var topRight = [0.5, -50]; //molti utenti, molta interazione
    
  
    // Perform bilinear interpolation
    var interpolatedValue = [];
    for (var i = 0; i < topLeft.length; i++) 
    {
        var top = topLeft[i] * (1 - x) + topRight[i] * x;
        var bottom = bottomLeft[i] * (1 - x) + bottomRight[i] * x;
        interpolatedValue[i] = top * (1 - y) + bottom * y;
    }

    //post("result: " + interpolatedValue + "\n");
    
    //return interpolatedValue;

    outlet(0, interpolatedValue);
}

function lerp(a, b) 
{
    var output = bilinearInterpolation(a,b);
    post("result: " + output + "\n");
}
  