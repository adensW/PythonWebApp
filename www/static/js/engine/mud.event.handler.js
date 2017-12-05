// function register(btn,handler,event){
//     console.log("register at "+btn)
//     btn.addEventListener(event,handler,false);
// }

// function removeRegister(btn,handler,event){
//     console.log("remove register at "+btn.id)
//     btn.removeEventListener(event,handler,false)
// }
var EventHandler = {
    register:function(element,type,handler){
        console.log("remove register at "+element.id)
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler)
        }else{
            element["on"+type] = handler
        }
    },
    removeRegister:function(element,type,handler){
        console.log("remove register at "+element.id)
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent("on"+type,handler)
        }else{
            element["on"+type] = null
        }
    }
}