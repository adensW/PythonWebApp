var story={
    stage_1:{
        question:"冒险者，选择你的出生地",
        chose:[  
            "东方大陆",
            "南方大陆",
            "西方大陆",
            "北方大陆"]
    }
        
}

init("engine")
// alert(story.stage_1.question)
displayText()
displayText(story.stage_1.question)
displayText(story.stage_1.question,1)

for (var i = 0; i < story.stage_1.chose.length; i++) {
    var str = story.stage_1.chose[i]
    var btn = addButton(str)
    EventHandler.register(btn,'click',function(){console.log(str)})
    
}







var handler = function(){
    e.clearscreen()
}
EventHandler.register(document.getElementById("clear"),"click",handler)
// removeRegister(document.getElementById("clear"),handler,"click")
var addtxt = function(){
    e.displayText("ahhhhhhhhhhhhhhhhhhhhhh",1)
}
EventHandler.register(document.getElementById('addtxt'),'click',addtxt)