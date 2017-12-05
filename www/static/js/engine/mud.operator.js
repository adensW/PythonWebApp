var e = new engine()
e.init("engine")
e.displayText("welcome fellows",1)
var handler = function(){
    e.clearscreen()
}
register(document.getElementById("clear"),handler,"click")
removeRegister(document.getElementById("clear"),handler,"click")