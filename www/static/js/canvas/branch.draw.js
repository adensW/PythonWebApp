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
var tree;
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
        this.canvas.height = 1080
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
        let lastElement = [];
        this.canvas.addEventListener('mousemove', function (e) {
            checkMousePosition(e.offsetX, e.offsetY)
        })
    },
    addClickEvent: function () {
        this.canvas.addEventListener('click', function (e) {
            var check = checkMousePosition(e.offsetX, e.offsetY)

            // if (check.isIn) {
            //     console.log('hello')
            //     animateList.push(new animateData(new Date().getTime(), 2000, check.element))
            // }
        })
    }
}
function circleComponent(x, y, radius, color = 'black') {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.Render = function () {
        context = branchArea.context
        context.fillStyle = color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
        context.closePath();
        context.fill();
    }

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
    this.getX = function () {
        console.log("hello2")
        return this.x
    }
    this.Render = function () {
        // console.log("hello")
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
    }
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
    context = branchArea.context
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = bold;
    context.lineCap="round";
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.closePath();
    context.stroke();

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
    let lastNode
    let firstTime = true
    tree.traverseBF(function (node) {
        // if(node.data.root=='root'){

        // }
        // console.log(node.data)
        if (node.data.root != 'root' && node.data != undefined && node.data != null) {
            // console.log(node)
            node.data.component.Render()
            //
            if (firstTime) {

                lastNode = node

                firstTime = false
            } else {

                // console.log(node.parent.uid)
                // console.log(node.parent)
                if(node.parent==tree){
                    let startX = lastNode.data.component.x
                    let startY = lastNode.data.component.y+lastNode.data.component.outradius;
                    let endX = node.data.component.x
                    let endY = node.data.component.y-node.data.component.outradius
                    Line(startX,startY,endX,endY,4,'black')
                    // Line(lastNode.data.component.x, lastNode.data.component.y, node.data.component.x, node.data.component.y, 2, 'black')
                }else 
                if (lastNode.parent==tree||node.parent.data.uid != lastNode.parent.data.uid) {
                    let startX = node.parent.data.component.x+node.parent.data.component.outradius;
                    let startY = node.parent.data.component.y
                    let endX = node.data.component.x-node.data.component.outradius
                    let endY = node.data.component.y
                    Line(startX,startY,endX,endY,4,'black')
                    // Line(node.parent.data.component.x, node.parent.data.component.y, node.data.component.x, node.data.component.y, 2, 'blue')
                    
                } else {
                    let startX = lastNode.data.component.x
                    let startY = lastNode.data.component.y+lastNode.data.component.outradius;
                    let endX = node.data.component.x
                    let endY = node.data.component.y-node.data.component.outradius
                    Line(startX,startY,endX,endY,4,'orange')
                    // Line(lastNode.data.component.x, lastNode.data.component.y, node.data.component.x, node.data.component.y, 2, 'orange')
                    // Line(n.data.component.x,n.data.component.y,node.data.component.x,node.data.component.y,2
                }
                
            }
            
        }
        lastNode = node
    })
    // window.requestAnimationFrame(updateBranchArea)
}
function startDrawBranch() {
    // window.requestAnimationFrame(updateBranchArea)
    let data = {
        root: 'root',
        uid: Math.floor(Math.random() * 1000 + 0) + ":" + new Date().getTime()
    }
    tree = new Tree(data)
    // console.log(tree)
    let y1 = 20, y2 = 40, y3 = 20
    for (let i = 0; i < 3; i++) {
        let data = {
            component: new ringComponent(20, y1, 10, 7, _COLOR.stage),
            type: 'stage',
            id: i,
            uid: Math.floor(Math.random() * 1000 + 0) + ":" + new Date().getTime()
        }
        let node = new Node(data)
        tree._root.children[i] = node
        node.parent = tree
        for (let j = 0; j < Math.floor(Math.random() *4 + 1); j++) {
            let data = {
                component: new ringComponent(60, y2, 10, 7, _COLOR.story),
                type: 'story',
                id: j,
                uid: Math.floor(Math.random() * 1000 + 0) + ":" + new Date().getTime()
            }
            let storynode = new Node(data)
            node.children[j] = storynode
            storynode.parent = node
            for (let k = 0; k < Math.floor(Math.random() *4 + 1); k++) {
                let data = {
                    component: new ringComponent(100, y3, 10, 7, _COLOR.choose),
                    type: 'choose',
                    id: k,
                    uid: Math.floor(Math.random() * 1000 + 0) + ":" + new Date().getTime()
                }
                let chooseNode = new Node(data)
                storynode.children[k] = chooseNode
                chooseNode.parent = storynode
                y3 += 50
            }
            y2 += 100
        }
        y1 += 150
    }

    branchArea.start()

    branchArea.addMouseOverEvent()
    branchArea.addClickEvent()
}
function checkMousePosition(x, y) {

    tree.traverseBF(function (node) {
        if (node.data.root != 'root' && node.data != undefined && node.data != null) {
            if (node.data.component.isInPath(x, y)) {
                node.data.component.outradius = 15
                node.data.component.innerradius = 10

            }
            else {
                node.data.component.reset()
            }
            // console.log(node.data.component)
        }
        return false
    })

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

function Node(data) {
    this.data = data
    this.parent = null
    this.children = []
}

function Tree(data) {
    data:{
        uid:122222
    }
    var node = new Node(data)
    this._root = node
}
Tree.prototype.traverseDF = function (callback) {

    // this is a recurse and immediately-invoking function 
    (function recurse(currentNode) {
        // step 2
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            // step 3
            recurse(currentNode.children[i]);
        }

        // step 4   
        callback(currentNode);

        // step 1
    })(this._root);

};
Tree.prototype.traverseBF = function (callback) {
    var queue = [];

    queue.push(this._root);

    currentTree = queue.shift();

    while (currentTree) {
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.push(currentTree.children[i]);
        }

        callback(currentTree);
        currentTree = queue.shift();
    }
};

