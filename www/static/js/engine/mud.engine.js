// var count = 11;
// var engine = {
//     count:0,
//     start:function(){
//             this.count=this.count+1;
//             console.log(this.count);
//             alert('engine start'+this.count);
//         } 
// }

// engine.start();
// engine.start();
var engine_screen = "<div class=\"screen-bg\"><div class=\"screen-display\"><\/div><div class=\"interactive\"><\/div><\/div>";
function engine(){
    this.count = 0;
    this.screen;
    this.interactive;
    this.start = function(){
        alert('engine start ' + this.count)
    }
    this.init = function(v){ 
        var engine_div =  document.getElementById(v);
        // remove_children(this.engine_div);
        engine_div.innerHTML="";
        var screen_bg = document.createElement("div");
        screen_bg.setAttribute('class','screen-bg');
        this.screen = document.createElement("div");
        this.screen.setAttribute('class','screen-display')
        screen_bg.appendChild(this.screen);
        engine_div.appendChild(screen_bg);
        this.interactive = document.createElement("div")
        this.interactive.setAttribute('class','interactive')
        engine_div.appendChild(this.interactive)
    }
    this.getScreen = function(){
        return this.screen;
    }
    this.getInteractive = function(){
        return this.interactive
    }
}

function remove_children(parent){
    var _children_count =  parent.childElementCount;
    var _children = parent.children;
    var i=0;
    while(this._children_count!=0){
        this._children = parent.children;
        this._children[0].remove()
        this._children_count =  parent.childElementCount;    
    }
  
}
var e = new engine();
e.init("engine")
alert(e.getScreen())


