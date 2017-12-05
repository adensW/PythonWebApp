var story={
    stage_1:{
            question:"冒险者，选择你的出生地",
            choose_1:"东方大陆",
            choose_2:"南方大陆",
            choose_3:"西方大陆",
            choose_4:"北方大陆"
        }
}

init("engine")
// alert(story.stage_1.question)
displayText()
displayText(story.stage_1.question)
displayText(story.stage_1.question,1)






var handler = function(){
    e.clearscreen()
}
EventHandler.register(document.getElementById("clear"),"click",handler)
// removeRegister(document.getElementById("clear"),handler,"click")
var addtxt = function(){
    e.displayText("ahhhhhhhhhhhhhhhhhhhhhh",1)
}
EventHandler.register(document.getElementById('addtxt'),'click',addtxt)