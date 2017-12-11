var checkpoint = []
var renderList = []
var animateList = []

var branchArea = {
    canvas: document.getElementById("branch"),
    start: function () {
        this.canvas.width = 300
        this.canvas.height = 500
        this.context = this.canvas.getContext('2d');
        this.frameNo = 0;
        // this.interval = setInterval(updateBranchArea,20);
        // this.interval = window.requestAnimationFrame(updateBranchArea);
        // this.index=100
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    addMouseOverEvent: function () {

        this.canvas.addEventListener('mousemove', function (e) {
            var check = checkMousePosition(e.offsetX, e.offsetY)
            // console.log('hello err'+check)
            if (check.isIn) {
                // console.log('hello'+check.index)
                setAnimation('blink',checkpoint[check.index])
                // animateList.push(checkpoint[check.index])

                // console.log('hello'+window.ind)
            } else {
               
                for (var i = 0; i < checkpoint.length; i++) {
                    // var newl = animateList.
                    checkpoint[i].reset()

                }
            }

        })
    },
    addClickEvent:function(){
        this.canvas.addEventListener('click', function (e) {
            var check = checkMousePosition(e.offsetX, e.offsetY)
            
            if (check.isIn) {
                console.log('hello')
                animateList.push(new animateData(new Date().getTime(),1200,checkpoint[check.index]))
            }
        })
    }
}
function pen(x,y,bold=1,color='black'){
    context = branchArea.context
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, bold, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
    context.fill();
}
function ringComponent(x, y, outradius, innerradius, color) {
    this.defaultX = x
    this.defaultY = y
    this.x = x
    this.y = y
    this.defaultOutradius = outradius
    this.defaultInnerradius = innerradius
    this.outradius = outradius
    this.innerradius = innerradius
    this.defaultStartAngle = 0
    this.defaultEndAngle = 360
    this.startAngle = 0
    this.endAngle = 360
    this.startPoint = 0//0上 1右2下3左
    this.Render = function () {
        context = branchArea.context
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.arc(this.x, this.y, this.outradius, Math.PI / 180 * (this.startAngle-90+(90*this.startPoint)), Math.PI / 180 * (this.endAngle-90+(90*this.startPoint)), false);
        context.closePath();
        context.fill();
        context.fillStyle = 'white';
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.arc(this.x, this.y, this.innerradius, Math.PI / 180 * (this.startAngle-90+(90*this.startPoint)), Math.PI / 180 * (this.endAngle-90+(90*this.startPoint)), false);
        context.closePath();
        context.fill();
        // （x-a)2+(y-b)2=r2
        //第一象限
        // for(xx=this.x;xx<=xx+this.innerradius;xx++){
        //     yy=Math.sqrt(Math.pow(this.innerradius,2)-Math.pow((xx-this.x),2))+b
        // }

    }
    this.isInPath = function (offsetX, offsetY) {
        context = branchArea.context
        context.beginPath();
        context.arc(this.x, this.y, this.outradius, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
        return context.isPointInPath(offsetX, offsetY);
    },
    this.reset = function () {
        this.x = this.defaultX
        this.y = this.defaultY
        this.outradius = this.defaultOutradius
        this.innerradius = this.defaultInnerradius
        this.startAngle = this.defaultStartAngle
        this.endAngle = this.defaultEndAngle
    }
    this.setAnimation = function (type) {
        if (type == 'blink') {
            this.outradius = 15
            this.innerradius = 10
        }
        
    }

}
function animateData(startTime,lastTime,component){
    this.startTime = startTime
    this.lastTime = lastTime
    this.component = component
    this.callNum = 0
    this.isAnimateOver = function(){
        this.callNum +=1
        if(this.startTime+this.lastTime<=new Date().getTime()){
            return true
        }
        return false
    }
}
setAnimation = function (type,o) {
    
    if (type == 'blink') {
        o.outradius = 15
        o.innerradius = 10
    }
    // if(type=='liner'){
    //     o.isAnimation = true
    //     o.animEndAngle += 45
        
    // }

}
var lastframe = 0
function updateBranchArea() {
    branchArea.clear()
    branchArea.frameNo += 1;

    for (var i = 0; i < animateList.length; i += 1) {
        if(!animateList[i].isAnimateOver()){
            animateList[i].component.endAngle =10*(animateList[i].callNum+1)
            // alert("pause")
        }else{
            // animateList[i].component.reset()
        }
    }
    for (var i = 0; i < checkpoint.length; i += 1) {
        checkpoint[i].Render();
    }
    // window.requestAnimationFrame(updateBranchArea)
}
function startDrawBranch() {
    // window.requestAnimationFrame(updateBranchArea)
    checkpoint.push(new ringComponent(20, 20, 10, 7, 'blue'))
    checkpoint.push(new ringComponent(20, 50, 10, 7, 'blue'))
    checkpoint.push(new ringComponent(20, 80, 10, 7, 'blue'))
    checkpoint.push(new ringComponent(20, 110, 10, 7, 'blue'))
    checkpoint.push(new ringComponent(20, 140, 10, 7, 'blue'))
    checkpoint.push(new ringComponent(20, 170, 10, 7, 'blue'))
    checkpoint.push(new ringComponent(20, 200, 10, 7, 'blue'))
    checkpoint.push(new ringComponent(20, 230, 10, 7, 'blue'))
    checkpoint.push(new ringComponent(50, 30, 10, 7, 'orange'))
    checkpoint.push(new ringComponent(50, 60, 10, 7, 'orange'))
    checkpoint.push(new ringComponent(50, 90, 10, 7, 'orange'))
    checkpoint.push(new ringComponent(50, 120, 10, 7, 'orange'))
    branchArea.start()

    branchArea.addMouseOverEvent()
    branchArea.addClickEvent()
}
function checkMousePosition(x, y) {
    for (let index = 0; index < checkpoint.length; index++) {
        if (checkpoint[index].isInPath(x, y)) {
            return {
                isIn: true,
                index: index
            }
        }
    }
    return false
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}

startDrawBranch()

var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
function animate() {
    stats.begin();
    // monitored code goes here
    updateBranchArea()
    stats.end();
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);