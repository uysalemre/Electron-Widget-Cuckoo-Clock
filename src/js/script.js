window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
              window.setTimeout(callback, 1000 / 60);
          };
})();

(function clock(){ 
    var hour = document.getElementById("hour"),
        min = document.getElementById("min"),
        sec = document.getElementById("sec");
    (function loop(){
        requestAnimFrame(loop);
        draw();
    })();
    function draw(){
        var now = new Date(),//now
            then = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0),//midnight
            diffInMil = (now.getTime() - then.getTime()),// difference in milliseconds
            h = (diffInMil/(1000*60*60)),//hours
            m = (h*60),//minutes
            s = (m*60);//seconds
        sec.style.webkitTransform = "rotate(" + (s * 6) + "deg)";
        hour.style.webkitTransform = "rotate(" + (h * 30 + (h / 2)) + "deg)";
        min.style.webkitTransform = "rotate(" + (m * 6) + "deg)";
    } 
})();


function displayClock()
{
        document.getElementById('event-adder').style.display ='none';
        document.getElementById('menu').style.display ='block';
        document.getElementById('clock').style.display ='block';
        document.getElementById('date').style.display ='block';
        document.getElementById('alarmer').style.display ='block';
        document.getElementById('eventscheduler').style.display ='none';
        document.getElementById('weatherforecast').style.display ='block';
}
function displayEvents()
{
        document.getElementById('event-adder').style.display ='block';
        document.getElementById('menu').style.display ='block';
        document.getElementById('clock').style.display ='none';
        document.getElementById('date').style.display ='none';
        document.getElementById('eventscheduler').style.display ='block';
        document.getElementById('alarmer').style.display ='none';
        document.getElementById('weatherforecast').style.display ='none';
       
}
