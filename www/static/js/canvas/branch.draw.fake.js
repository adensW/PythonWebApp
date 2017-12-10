
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

function drawRing(color, x, y, outradius, innerradius) {
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
function drawLine(color, start_x, start_y, end_x, end_y, bold = 1) {
    // k=(end_y-start_y)/(end_x-start_x);
    // (x-x1)/(x2-x1)=(y-y1)/(y2-y1)
    // y=(x-x1)/(x2-x1)*(y2-y1)+y1
    for (var i = start_x; i < end_x; i++) {
        var x = i;
        var y = (x - start_x) / (end_x - start_x) * (end_y - start_y) + start_y;
        drawCircle(context, color, x, y, bold)
    }

}
function drawPolyline(color,vertex,bold){
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
function drawCircle( color, x, y, radius) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
    context.fill();
}




function circle(x, y, radius, startAngle, endAngle, auticlockwise,color=c_stage) {
    this.x = x
    this.y = y
    this.color = color
    this.radius = radius
    this.startAngle = startAngle
    this.endAngle = endAngle
    this.auticlockwise = auticlockwise
    this.isInPath = function (offset_x, offset_y) {
        context.beginPath();
        
        context.arc(x, y, radius, Math.PI / 180 * startAngle, Math.PI / 180 * endAngle, auticlockwise);
        return context.isPointInPath(offset_x, offset_y);
    }
    this.draw = function(){
        context.fillStyle=color;
        context.beginPath();
        context.arc(x, y, radius, Math.PI / 180 * startAngle, Math.PI / 180 * endAngle, auticlockwise);
        context.fill();
    }
    this.update =function(){
        this.radius = this.radius*1.2
        
       
    }
}
function ring(x, y, outradius,innerradius, startAngle, endAngle, auticlockwise,color=c_story) {
    this.x = x
    this.y = y
    this.outradius = outradius
    this.innerradius = innerradius
    this.startAngle = startAngle
    this.endAngle = endAngle
    this.auticlockwise = auticlockwise
    this.isInPath = function (offset_x, offset_y) {
        context.beginPath();
        
        context.arc(x, y, outradius, Math.PI / 180 * startAngle, Math.PI / 180 * endAngle, auticlockwise);
        return context.isPointInPath(offset_x, offset_y);
    }
    this.draw = function(){
        context.fillStyle=color;   
        context.beginPath();
        context.arc(x, y, outradius, Math.PI / 180 * startAngle, Math.PI / 180 * endAngle, auticlockwise);
        context.fill();
        context.fillStyle='white';    
        context.beginPath();
        context.arc(x, y, innerradius, Math.PI / 180 * startAngle, Math.PI / 180 * endAngle, auticlockwise);
        context.fill();
    }
    this.update =function(){
        this.outradius = this.outradius*2
        this.innerradius = this.innerradius*2
       
    }
}

function line(start_x,start_y,end_x,end_y,bold=1,color = c_line){
    this.start_x=start_x
    this.start_y=start_y
    this.end_x=end_x
    this.end_y = end_y
    this.isInPath = function (offset_x, offset_y) {
        context.beginPath();
        
        context.moveTo(start_x, start_y);
        context.lineTo(end_x, end_y); 
        return context.isPointInPath(offset_x, offset_y);
    }
    this.draw = function(){
        for (var i = start_x; i < end_x; i++) {
            var x = i;
            var y = (x - start_x) / (end_x - start_x) * (end_y - start_y) + start_y;
            drawCircle( color, x, y, bold)
        }
    }
}
function clickData(data) {
    this.data = data
}
function vector2(x,y){
    this.x = x
    this.y = y
}




var region = new Array();
var regionData = new Array()
var e = new circle(10, 10, 10, 0, 360, false)
region.push(e)
var e = new ring(10, 50, 10,7, 0, 360, false)
region.push(e)
var e = new circle(10, 80, 10, 0, 360, false)
region.push(e)
var e = new line(10, 80, 50, 100)
region.push(e)
var rd = new clickData("daddddddddd")
regionData.push(rd)
// console.log(region)
var EventHandler = {
    hasEvent: function (x, y) {
        // console.log(region)
        for (let i = 0; i < region.length; i++) {
            if (region[i].isInPath(x, y)) {
                
                return i
            }
        }
        return null
    }
}
var ischange = true;
function drawFrame(){
    context.clearRect(0, 0, 300, 500);
    
    for (let i = 0; i < region.length; i++) {
        region[i].draw()
        
    }
    
    this.canvas.addEventListener("click", function (e) {
        var index = EventHandler.hasEvent(e.offsetX, e.offsetY)
        if (index != null) {
            console.log(index)
        }
    });
    var mouseOnTarget = false;
    var count = 0
    this.canvas.addEventListener("mousemove", function (ev) {
        // console.log(e.offsetX+","+e.offsetY)

        var ins = EventHandler.hasEvent(ev.offsetX, ev.offsetY)
        if(ins!=null){
            count = count+1
            if(count==1){
                console.log(ins)
                
            }
        }else{
            count = 0
        }
        // console.log(ins)  
    });
    // window.requestAnimationFrame(drawFrame)
   
}

function Init(){
    
        drawFrame()
   
    // window.requestAnimationFrame(Init)
}
Init()
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

function animate() {

	stats.begin();

	// monitored code goes here

	stats.end();

	requestAnimationFrame( animate );

}

requestAnimationFrame( animate );