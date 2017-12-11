var checkpoint = {
    stage: [],
    story: [],
    chose: [],
    refstory: [],
    push: function (element, type) {
        if (type == 'stage') {
            this.stage.push(element)
        }
        if (type == 'story') {
            this.story.push(element)
        }
        if (type == 'chose') {
            this.chose.push(element)
        }
        if (type == 'refstory') {
            this.refstory.push(element)
        }
    }
}
checkpoint.prototype = {

}
var ringRenderList = []
var animateList = []
var _COLOR = {
    stage: 'black',
    story: 'rgb(76,156,217)',
    choose: 'rgb(150,214,159)',
    refstory: 'rgb(238,196,58)'
}
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
        let lastElement=[];
        this.canvas.addEventListener('mousemove', function (e) {
            var check = checkMousePosition(e.offsetX, e.offsetY)
            
            // console.log('hello err'+check)
            if (check.isIn) {
                lastElement.push(check.element)
                // console.log('hello'+check.index)
                setAnimation('blink', check.element)
                // animateList.push(checkpoint[check.index])

                // console.log('hello'+window.ind)
            } else {
                for(let i = 0;i<lastElement.length;i++){
                    lastElement.shift().reset()
                }
                // if(lastElement.element!=undefined&&lastElement.element!=null){
                //     lastElement.element.reset()
                // }
                // check.element.reset()
                // for (var i = 0; i < checkpoint.length; i++) {
                //     // var newl = animateList.
                //     checkpoint[i].reset()

                // }
            }

        })
    },
    addClickEvent: function () {
        this.canvas.addEventListener('click', function (e) {
            var check = checkMousePosition(e.offsetX, e.offsetY)

            if (check.isIn) {
                console.log('hello')
                animateList.push(new animateData(new Date().getTime(), 2000, check.element))
            }
        })
    }
}
function pen(x, y, bold = 1, color = 'black') {
    context = branchArea.context
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, bold, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
    context.closePath();
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
        context.arc(this.x, this.y, this.outradius, Math.PI / 180 * (this.startAngle - 90 + (90 * this.startPoint)), Math.PI / 180 * (this.endAngle - 90 + (90 * this.startPoint)), false);
        context.closePath();
        context.fill();
        context.fillStyle = 'white';
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.arc(this.x, this.y, this.innerradius, Math.PI / 180 * (this.startAngle - 90 + (90 * this.startPoint)), Math.PI / 180 * (this.endAngle - 90 + (90 * this.startPoint)), false);
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
        context.arc(this.x, this.y, this.defaultOutradius, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
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
function Line(startX, startY, endX, endY, bold = 1, color = 'black') {
    // (y-endY)/(startY-endY) = (x-endX)/(startX-endX)
    let x, y
    if (startX - endX == 0) {
        x = startX
        for (y = startY; y <= endY; y++) {
            pen(x, y, bold, color)
        }
    } else if (startY - endY == 0) {
        y = startY
        for (x = startX; x <= endX; x++) {
            pen(x, y, bold, color)
        }
    } else {
        for (x = startX; x <= endX; x++) {
            y = (x - endX) / (startX - endX) * (startY - endY) + endY
            // y=Math.floor(y)
            pen(x, y, bold, color)
        }
        // console.log(startX+','+startY+'=>'+endX+','+endY+':'+x+','+y)
    }
}
function animateData(startTime, lastTime, component) {
    this.startTime = startTime
    this.lastTime = lastTime
    this.component = component
    this.callNum = 0
    this.isAnimateOver = function () {
        this.callNum += 1
        if (this.startTime + this.lastTime <= new Date().getTime()) {
            return true
        }
        return false
    }
}
setAnimation = function (type, o) {

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
        if (!animateList[i].isAnimateOver()) {
            animateList[i].component.endAngle = 10 * (animateList[i].callNum)
            // alert("pause")
        } else {
            // animateList[i].component.reset()
        }
    }
    // let x,y
    
        for (let i = 0; i < checkpoint.stage.length; i += 1) {
            checkpoint.stage[i].Render();
            if (i != 0) {
                startX = checkpoint.stage[i - 1].x
                startY = checkpoint.stage[i - 1].y + checkpoint.stage[i - 1].outradius
                endX = checkpoint.stage[i].x
                endY = checkpoint.stage[i].y - checkpoint.stage[i].outradius
                // console.log(startX+','+startY+'=>'+endX+','+endY)
                Line(startX, startY, endX, endY, 2, 'black')
            }
        }
        for (let i = 0; i < checkpoint.story.length; i += 1) {
            checkpoint.story[i].Render();
            if (i != 0) {
                startX = checkpoint.story[i - 1].x
                startY = checkpoint.story[i - 1].y + checkpoint.story[i - 1].outradius
                endX = checkpoint.story[i].x
                endY = checkpoint.story[i].y - checkpoint.story[i].outradius
                // console.log(startX+','+startY+'=>'+endX+','+endY)
                Line(startX, startY, endX, endY, 2, 'black')
            }
        }for (let i = 0; i < checkpoint.chose.length; i += 1) {
            checkpoint.chose[i].Render();
            if (i != 0) {
                startX = checkpoint.chose[i - 1].x
                startY = checkpoint.chose[i - 1].y + checkpoint.chose[i - 1].outradius
                endX = checkpoint.chose[i].x
                endY = checkpoint.chose[i].y - checkpoint.chose[i].outradius
                // console.log(startX+','+startY+'=>'+endX+','+endY)
                Line(startX, startY, endX, endY, 2, 'black')
            }
        }for (let i = 0; i < checkpoint.refstory.length; i += 1) {
            checkpoint.refstory[i].Render();
            if (i != 0) {
                startX = checkpoint.refstory[i - 1].x
                startY = checkpoint.refstory[i - 1].y + checkpoint.refstory[i - 1].outradius
                endX = checkpoint.refstory[i].x
                endY = checkpoint.refstory[i].y - checkpoint.refstory[i].outradius
                // console.log(startX+','+startY+'=>'+endX+','+endY)
                Line(startX, startY, endX, endY, 2, 'black')
            }
        }
    // window.requestAnimationFrame(updateBranchArea)
}
function startDrawBranch() {
    // window.requestAnimationFrame(updateBranchArea)
    checkpoint.push(new ringComponent(20, 20, 10, 7, _COLOR.stage), 'stage')
    checkpoint.push(new ringComponent(20, 50, 10, 7, _COLOR.stage), 'stage')
    checkpoint.push(new ringComponent(20, 80, 10, 7, _COLOR.stage), 'stage')
    checkpoint.push(new ringComponent(20, 110, 10, 7, _COLOR.stage), 'stage')
    checkpoint.push(new ringComponent(20, 140, 10, 7, _COLOR.stage), 'stage')
    checkpoint.push(new ringComponent(20, 170, 10, 7, _COLOR.stage), 'stage')
    checkpoint.push(new ringComponent(20, 200, 10, 7, _COLOR.stage), 'stage')
    checkpoint.push(new ringComponent(20, 230, 10, 7, _COLOR.stage), 'stage')
    checkpoint.push(new ringComponent(50, 30, 10, 7, _COLOR.story), 'story')
    checkpoint.push(new ringComponent(50, 60, 10, 7, _COLOR.story), 'story')
    checkpoint.push(new ringComponent(50, 90, 10, 7, _COLOR.story), 'story')
    checkpoint.push(new ringComponent(50, 120, 10, 7, _COLOR.story), 'story')
    // for(let i = 0;i<checkpoint.length;i++){

    // }
    branchArea.start()

    branchArea.addMouseOverEvent()
    branchArea.addClickEvent()
}
function checkMousePosition(x, y) {
    for (let index = 0; index < checkpoint.stage.length; index++) {
        if (checkpoint.stage[index].isInPath(x, y)) {
            return {
                isIn: true,
                index: index,
                element:checkpoint.stage[index]
            }
        }
    }
    for (let index = 0; index < checkpoint.story.length; index++) {
        if (checkpoint.story[index].isInPath(x, y)) {
            return {
                isIn: true,
                index: index,
                element:checkpoint.story[index]
            }
        }
    }
    for (let index = 0; index < checkpoint.chose.length; index++) {
        if (checkpoint.chose[index].isInPath(x, y)) {
            return {
                isIn: true,
                index: index,
                element:checkpoint.chose[index]
            }
        }
    }
    for (let index = 0; index < checkpoint.refstory.length; index++) {
        if (checkpoint.refstory[index].isInPath(x, y)) {
            return {
                isIn: true,
                index: index,
                element:checkpoint.refstory[index]
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