
var engine = {
    count:0,
    start:function(){
            this.count=this.count+1;
            console.log(this.count);
            alert('engine start'+this.count);
        } 
}

var r1 = new engine;
r1.start();
var r2 = new engine;
r2.start();

