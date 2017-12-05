function register(btn,handler,event){
    console.log("register at "+btn)
    btn.addEventListener(event,handler,false);
}

function removeRegister(btn,handler,event){
    console.log("remove register at "+btn.id)
    btn.removeEventListener(event,handler,false)
}