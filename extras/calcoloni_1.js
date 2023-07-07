autowatch = 1;

gvideoLength = 0.375;

function vLength(a) 
{
    gvideoLength = a;
}

function cane(a) 
{
    var a;
    var fuori = [];

    a = a - gvideoLength;

    for (i=0; i <7; i++) 
    {
        a = a+gvideoLength;
        fuori.push(a);
        outlet(0, fuori);
    }
    
}