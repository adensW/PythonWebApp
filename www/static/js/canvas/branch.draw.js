
var
    c_stage = "#0080ff",
    c_story = "#ff8000",
    c_choose = "#ffff00",
    c_refstory = "#00ffff",
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
function drawPolyline(context,color,vertex,bold){
    if(vertex instanceof Array){
        if(vertex.length>1){
            for(var i = 0;i<vertex.length-1;i++){
                var x=vertex[i].x
                var y=vertex[i].y
                var ex=vertex[i+1].x
                var ey=vertex[i+1].y
                drawLine(context,color,x,y,ex,ey,bold)
            }
        }
    }
}
function drawCircle(context, color, x, y, radius) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
    context.fill();
}




function circleClickRegion(x, y, radius, startAngle, endAngle, auticlockwise) {
    this.x = x
    this.y = y
    this.radius = radius
    this.startAngle = startAngle
    this.endAngle = endAngle
    this.auticlockwise = auticlockwise
    this.isInPath = function (context, offset_x, offset_y) {
        context.arc(x, y, radius, Math.PI / 180 * startAngle, Math.PI / 180 * endAngle, auticlockwise);
        return context.isPointInPath(offset_x, offset_y);

    }
}
function clickData(data) {
    this.data = data
}
function vector2(x,y){
    this.x = x
    this.y = y
}
var vertex = new Array() 

    // Math.floor(Math.random()*100+1) 
    vertex.push(new vector2(30,15))
    vertex.push(new vector2(40,25))
    vertex.push(new vector2(60,25))

drawPolyline(context,c_line,vertex)
drawRing(context, c_stage, 10, 10, 10, 7)
drawRing(context, c_stage, 10, 50, 10, 7)
drawLine(context, c_line, 19, 10, 54, 20, 2)


var region = new Array();
var regionData = new Array()
var e = new circleClickRegion(10, 10, 10, 0, 360, false)
region.push(e)
var rd = new clickData("daddddddddd")
regionData.push(rd)

var EventHandler = {
    hasEvent: function (context, x, y) {
        // console.log(region)
        for (var i = 0; i < region.length; i++) {
            if (region[i].isInPath(context, x, y)) {
                return i
            }
        }
        return null
    }
}

this.canvas.addEventListener("click", function (e) {
    // console.log(region[0].isInPath(context,e.offsetX,e.offsetY))
    // console.log(EventHandler.hasEvent(context,e.offsetX,e.offsetY))
    var index = EventHandler.hasEvent(context, e.offsetX, e.offsetY)
    if (index != null) {
        console.log(regionData[index].data)
    }
});

