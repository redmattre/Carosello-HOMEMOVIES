//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////SQUARES//////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

var squares = [
  document.querySelector(".square-1"),
  document.querySelector(".square-2"),
  document.querySelector(".square-3"),
  document.querySelector(".square-4")
];

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
});

manager.on("swiperight", function(event) {
  var gestureSpeed = event.velocityX;
  gestureSpeed = scaleValue(Math.abs(gestureSpeed), 0, 10, 600, 120);
  send("swiperight " + gestureSpeed);
});

manager.on("doubletap", function(event) {
  send("doubletap");
});

manager.on("swipedown", function(event) {
  var gestureSpeed = event.velocityY;
  gestureSpeed = scaleValue(Math.abs(gestureSpeed), 0, 10, 600, 120);

  send("swipeup " + gestureSpeed);

  // Reset the square elements to their original positions and opacity
  squares[0].style.opacity = "0.4";
  squares[0].style.transform = "translate(0, -21vh)";
  squares[0].style.scale = "96%";
  squares[1].style.opacity = "1";
  squares[1].style.transform = "translate(0, 0)";
  squares[1].style.scale = "100%";
  squares[2].style.opacity = "0.4";
  squares[2].style.transform = "translate(0, 21vh)";
  squares[2].style.scale = "96%";
  squares[3].style.opacity = "0";
  squares[3].style.transform = "translate(0, -39vh)";
  squares[3].style.scale = "96%";

  // Update the array order
  squares.unshift(squares.pop());
});

manager.on("swipeup ", function(event) {
  var gestureSpeed = event.velocityY;
  gestureSpeed = scaleValue(Math.abs(gestureSpeed), 0, 10, 600, 120);
  
  send("swipedown " + gestureSpeed);

  // Animate the squares by changing their properties directly
  squares[0].style.opacity = "1";
  squares[0].style.transform = "translate(0, 0)";
  squares[0].style.scale = "100%";
  squares[1].style.opacity = "0.4";
  squares[1].style.transform = "translate(0, 21vh)";
  squares[1].style.scale = "96%";
  squares[2].style.opacity = "0";
  squares[2].style.transform = "translate(0, -49vh)";
  squares[2].style.scale = "96%";
  squares[3].style.opacity = "0.4";
  squares[3].style.transform = "translate(0, -21vh)";
  squares[3].style.scale = "96%";

  // Update the array order
  squares.push(squares.shift());
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
/////////////////////////////////////TICKER-BEHAVIOUR/////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

/*

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
*/



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