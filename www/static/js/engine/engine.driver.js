var e = new engine()

function init(elm){
    e.init("engine")
}

function displayText(text,option){
    if(arguments.length==0){
        e.displayText()
    }else if(arguments.length==1){
        e.displayText(text)
    }else if(arguments.length==2){
        e.displayText(text,option)   
    }else if(arguments.length==3){
         
    }
}
