
var
    c_stage = "#0080ff"
c_story = "#ff8000"
c_choose = "#ffff00"
c_refstory = "#00ffff"
c_line = "#00ff40"

var canvas = document.getElementById('branch')
canvas.height = 500;
canvas.width = 300;
var context = canvas.getContext('2d');

function drawRing(context, color, x, y, outradius, innerradius) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, outradius, 0, Math.PI * 2, false);

    context.fill();

    context.fillStyle = 'white';
    context.beginPath();
    context.arc(x, y, innerradius, 0, Math.PI * 2, false);
    context.fill();
    // context.addHitRegion({id: "circle"});


}
function drawLine(context, color, start_x, start_y, end_x, end_y, bold = 1) {
    // k=(end_y-start_y)/(end_x-start_x);
    // (x-x1)/(x2-x1)=(y-y1)/(y2-y1)
    // y=(x-x1)/(x2-x1)*(y2-y1)+y1
    for (var i = start_x; i < end_x; i++) {
        var x = i;
        var y = (x - start_x) / (end_x - start_x) * (end_y - start_y) + start_y;
        drawCircle(context, color, x, y, bold)
    }

}
function drawCircle(context, color, x, y, radius) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
    context.fill();
}
function isInPath(x, y) {
    // context.arc(10, 10,10, 0, Math.PI * 2);
    // return context.isPointInPath(x, y);
    return this.hitRegion.isInPath(x, y)
}

drawRing(context, c_stage, 10, 10, 10, 7)

drawLine(context, c_line, 19, 10, 54, 20, 2)
this.canvas.addEventListener("click", function (e) {
    console.log(region[0].isInPath(context,e.offsetX,e.offsetY))
    // if (isInPath(e.offsetX, e.offsetY)) {
    //     console.log('hello')
    // }
});

function circleClickRegion(x,y,radius,startAngle,endAngle,auticlockwise){
    this.x = x
    this.y = y
    this.radius = radius
    this.startAngle = startAngle
    this.endAngle = endAngle
    this.auticlockwise = auticlockwise
    this.isInPath=function (context,offset_x,offset_y) {
        context.arc(x, y, radius, Math.PI / 180 * startAngle, Math.PI / 180 * endAngle, auticlockwise);
        return context.isPointInPath(offset_x, offset_y);
        
    }
}
var e = new circleClickRegion(10,10,10,0,360,false)

var region = new Array();
region.push(e)