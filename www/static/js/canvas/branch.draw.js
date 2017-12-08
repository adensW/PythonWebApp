
var 
    c_stage="#0080ff"
    c_story="#ff8000"
    c_choose="#ffff00"
    c_refstory="#00ffff"
    c_line="#00ff40"

var canvas = document.getElementById('branch')
canvas.height=500;
canvas.width=300;
var context  = canvas.getContext('2d');

function drawRing(context,color,x,y,outradius,innerradius){
    context.fillStyle=color;
    context.beginPath();
    context.arc(x, y, outradius, 0, Math.PI * 2, false);
    context.fill();
   
    context.fillStyle='white';
    context.beginPath();
    context.arc(x, y, innerradius, 0, Math.PI * 2, false);
    context.fill();
    // context.addHitRegion({id: "circle"});
    
}
function isInPath (x, y){
    context.arc(10, 10,10, 0, Math.PI * 2);
    return context.isPointInPath(x, y);
}
drawRing(context,c_stage,10,10,10,7)
this.canvas.addEventListener("click", function(e){
    if(isInPath(e.offsetX, e.offsetY)) {
        console.log('hello')
    }
  });