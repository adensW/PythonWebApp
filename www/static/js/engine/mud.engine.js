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
    
    this.screen;
    this.interactive;
    this.start = function(){
        console.log('engine start ')
    }
    this.init = function(v){ 
        console.log('engine start ')
        var engine_div =  document.getElementById(v);
        // remove_children(this.engine_div);
        engine_div.innerHTML="";
        var screen_bg = document.createElement("div");
        screen_bg.setAttribute('class','screen-bg');
        this.screen = document.createElement("div");
        this.screen.setAttribute('class','screen-display')
        this.screen.setAttribute('id','screen')
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
    this.displayText = function(text,place,opt){
        if(arguments.length==0){
            var text = document.createElement("p");
            text.innerHTML = "Waitting..."
            var p = this.getScreen()
            p.appendChild(text)
            
        }
        else if(arguments.length==1){

        }else if(arguments.length==2){
            var count= 0
            var t
            var elm_p = document.createElement('p')
            this.screen.appendChild(elm_p)
            function typeText(){
                // alert(elm_p+""+count)
                elm_p.innerText=text.substr(0,count)
                // elm_p.append(text.charAt(count))
                if (count < text.length) {
                    count++
                    t = setTimeout(typeText, 100);
                }
                else
                    clearTimeout(t);
            }
            typeText();
        }
        
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
// e.displayText();

e.displayText("welcone fellow",1);