var e = new engine()
e.init("engine")
e.displayText("welcome fellows",1)
var handler = function(){
    e.clearscreen()
}
EventHandler.register(document.getElementById("clear"),"click",handler)
// removeRegister(document.getElementById("clear"),handler,"click")
var addtxt = function(){
    e.displayText("ahhhhhhhhhhhhhhhhhhhhhh",1)
}
EventHandler.register(document.getElementById('addtxt'),'click',addtxt)