var checkpoint=[]

function drawBranch(){

}
var branchArea = {
    canvas:document.getElementById("branch"),
    start:function(){
        this.canvas.width=300
        this.canvas.height=500
        this.context = this.canvas.getContext('2d');
        this.frameNo = 0;
        this.interval = setInterval(updateBranchArea, 20);
        
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    addClickEvent:function(){
        
        this.canvas.addEventListener("click", function (e) {
            var check = checkMousePosition(e.offsetX,e.offsetY)
            // console.log('hello err'+check)
            if(check.isIn){
                // console.log('hello'+check.index)
                this.index=check.index
                console.log('hello'+this.index)
            }

        })
    }
}

function ringComponent(x,y,outradius,innerradius,color){
    this.x = x
    this.y = y
    this.outradius = outradius
    this.innerradius = innerradius
    this.outspeed = 1
    this.innerspeed = 0.8
    this.update = function(){
        context = branchArea.context
        context.fillStyle=color;
        context.beginPath();
        context.arc(this.x, this.y, this.outradius, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
        context.fill();
        context.fillStyle='white';    
        context.beginPath();
        context.arc(this.x,this. y, this.innerradius, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
        context.fill();
        
    }
    this.isInPath=function(offsetX,offsetY){
        context = branchArea.context
        context.beginPath();
        context.arc(this.x, this.y, this.outradius, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
        return context.isPointInPath(offsetX, offsetY);
    }
    this.scale=function(){
        this.outradius += this.outspeed
        this.innerradius +=this.innerspeed
       
    }

}
var lastframe = 0
function updateBranchArea(){
    branchArea.clear()
    branchArea.frameNo +=1;
    lastframe +=1
    for (i = 0; i < checkpoint.length; i += 1) {
        // checkpoint[i].x += -1;
        if(lastframe<8){
            checkpoint[i].scale();
        }
        
        checkpoint[i].update();
    }
    
    
    
}
function startDrawBranch(){
    checkpoint.push(new ringComponent(20,20,10,7,'blue'))
    checkpoint.push(new ringComponent(20,50,10,7,'blue'))
    checkpoint.push(new ringComponent(20,80,10,7,'blue'))
    checkpoint.push(new ringComponent(20,110,10,7,'blue'))
    branchArea.start()
    // branchArea.addClickEvent()
}
function checkMousePosition(x,y){
    for (let index = 0; index < checkpoint.length; index++) {
        if(checkpoint[index].isInPath(x,y)){
            return {
                isIn: true,
                index:index
            }
        }
        
    }
    return false
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}
startDrawBranch()
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