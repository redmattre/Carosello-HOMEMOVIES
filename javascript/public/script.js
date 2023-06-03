//ScreenSize
window.onload = function() 
{
  send(screen.height);
  send(screen.width);
}

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////GESTURE-RECOGN///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//gesture area element
const gestureArea = document.getElementById("gesture-area");

//Hammer.js manager for the gesture area
const manager = new Hammer.Manager(gestureArea);

//gesture recognizers
manager.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_ALL, threshold: 100 }));
manager.add(new Hammer.Tap({ event: 'doubletap', taps: 2, threshold: 20, posThreshold: 100 }));

//events
manager.on("swipeleft", function(event) {
  var gestureSpeed = event.velocityX;
  gestureSpeed = scaleValue(Math.abs(gestureSpeed), 0, 10, 600, 120);
  send("swipeleft " + gestureSpeed);
  rotateCube('left');
});

manager.on("swiperight", function(event) {
  var gestureSpeed = event.velocityX;
  gestureSpeed = scaleValue(Math.abs(gestureSpeed), 0, 10, 600, 120);
  send("swiperight " + gestureSpeed);
  rotateCube('right');
});

manager.on("swipeup", function(event) {
  var gestureSpeed = event.velocityY;
  gestureSpeed = scaleValue(Math.abs(gestureSpeed), 0, 10, 600, 120);
  rotateCube('down');
  send("swipedown " + gestureSpeed);
});

manager.on("swipedown ", function(event) {
  var gestureSpeed = event.velocityY;
  gestureSpeed = scaleValue(Math.abs(gestureSpeed), 0, 10, 600, 120);
  rotateCube('up');
  send("swipeup " + gestureSpeed);
});

manager.on("doubletap", function(event) {
  send("doubletap");
});

function scaleValue(value, minValue, maxValue, scaledMin, scaledMax) 
{
  // Limita il valore tra il minimo e il massimo
  var clippedValue = Math.max(Math.min(value, maxValue), minValue);

  // Calcola la scala
  var scaleFactor = (scaledMax - scaledMin) / (maxValue - minValue);

  // Riscalare il valore
  var scaledValue = scaledMin + (clippedValue - minValue) * scaleFactor;

  scaledValue = Math.round(scaledValue);

  return scaledValue;
}


//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////CUBE-BEHAVIOUR///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//cube variables
var cube = $('.cube');
var currentFace = 'front';

//current rotation state
var currentRotation = {
  x: 0,
  y: 0,
  z: 0
};

//ruota il cubo
function rotateCube(direction) {
  // Update the current rotation state based on the swipe direction
  switch (direction) {
    case 'left':
      currentRotation.y -= 90;
      break;
    case 'right':
      currentRotation.y += 90;
      break;
    case 'up':
      currentRotation.x -= 90;
      break;
    case 'down':
      currentRotation.x += 90;
      break;
  }

  // Rotate the cube
  cube.css('transform', 'rotateX(' + currentRotation.x + 'deg) rotateY(' + currentRotation.y + 'deg) rotateZ(' + currentRotation.z + 'deg)');

  // Update the current face based on the new rotation state
  currentFace = getCurrentFace();
}

//helper function to get the current visible face of the cube
function getCurrentFace() {
  var faces = ['front', 'back', 'left', 'right', 'top', 'bottom'];
  var faceIndex = Math.round(currentRotation.y / 90) % 4;
  if (faceIndex < 0) {
    faceIndex += 4;
  }
  if (currentRotation.x === -90) {
    return 'top';
  } else if (currentRotation.x === 90) {
    return 'bottom';
  } else if (faceIndex === 0) {
    return 'front';
  } else if (faceIndex === 1) {
    return 'right';
  } else if (faceIndex === 2) {
    return 'back';
  } else if (faceIndex === 3) {
    return 'left';
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////TICKER-BEHAVIOUR/////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


jQuery(function ($) {

  if ($('marquee').length == 0) {
      return;
  }

  $('marquee').each(function () {
      
      let direction = $(this).attr('direction');
      let scrollamount = $(this).attr('scrollamount');
      let scrolldelay = $(this).attr('scrolldelay');

      let newMarquee = $('<div class="new-marquee"></div>');
      $(newMarquee).html($(this).html());
      $(newMarquee).attr('direction',direction);
      $(newMarquee).attr('scrollamount',scrollamount);
      $(newMarquee).attr('scrolldelay',scrolldelay);
      $(newMarquee).css('white-space', 'nowrap');

      let wrapper = $('<div style="overflow:hidden"></div>').append(newMarquee);
      $(this).replaceWith(wrapper);

  });

  function start_marquee() {

      let marqueeElements = document.getElementsByClassName('new-marquee');
      let marqueLen = marqueeElements.length
      for (let k = 0; k < marqueLen; k++) {

          
          let space = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
          let marqueeEl = marqueeElements[k];

          let direction = marqueeEl.getAttribute('direction');
          let scrolldelay = marqueeEl.getAttribute('scrolldelay') * 100;
          let scrollamount = marqueeEl.getAttribute('scrollamount');

          let marqueeText = marqueeEl.innerHTML;

          marqueeEl.innerHTML = marqueeText + space;
          marqueeEl.style.position = 'absolute'; 

          let width = (marqueeEl.clientWidth + 1);
          let i = (direction == 'rigth') ? width : 0;
          let step = (scrollamount !== undefined) ? parseInt(scrollamount) : 3;

          marqueeEl.style.position = '';
          marqueeEl.innerHTML = marqueeText + space + marqueeText + space;

          setInterval( function () {

              if ( direction.toLowerCase() == 'left') {
  
                  i = i < width ? i + step : 1;
                  marqueeEl.style.marginLeft = -i + 'px';

              } else {

                  i = i > -width ? i - step : width;
                  marqueeEl.style.marginLeft = -i + 'px';

              }

          }, scrolldelay);

      }
  }

  start_marquee ();
});

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////WEBSOCKET-BEHAVIOUR//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


var address = "http://127.0.0.1:7776";
var ioClient = io();
roomName = "testRoom"
let password = "";

makeClient()

setTimeout(()=>{
  ioClient.emit('join', roomName, password)
  console.log("joining")
}, 200);

function makeClient() {

    ioClient.on('datachannel', (msg) => {
        console.log(msg)
    })

    ioClient.on('systemchannel', (msg) => {
        console.log(msg)
    })

    ioClient.on("disconnect", (msg) => {
        if (msg !== undefined && msg !== null) {
            if (isJson(msg)) {
                msg = JSON.parse(msg)
            } else {

            }
        }
    })

    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}

function send (msg) {
  //qui secondo me aggiungere il codice per mandare anche l'IP, direttamente nel messaggio, tanto se il messaggio arriva deve sapere anche l'IP per forza
  ioClient.emit("datachannel", roomName, msg);
}

//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////USER-INFOS////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//IP
//per ora l'ip è stato spostato ad essere un elemento che arriva insieme alle gesture

/*
// Get connection speed
let connectionSpeed = navigator.connection ? navigator.connection.downlink : "Unknown";
let connectionSpeedInBaud = connectionSpeed * 1024 / 10;
send("Bauds" + connectionSpeedInBaud);



// Get bandwidth delay product
let bandwidthDelayProduct = connectionSpeed * 1000 * 1000 * (navigator.connection ? navigator.connection.rtt : 0) / 8;
let bandwidthDelayProductInMB = bandwidthDelayProduct / 1000 / 1000;
send("BDP" + bandwidthDelayProductInMB.toFixed(2));
*/