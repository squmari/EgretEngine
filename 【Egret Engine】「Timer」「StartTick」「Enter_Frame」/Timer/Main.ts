class Main extends egret.DisplayObjectContainer {

        public constructor() {
        super();
        
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }


    private addToStage() {

        const timer:egret.Timer = new egret.Timer(1000,0);
        timer.addEventListener(egret.TimerEvent.TIMER,this.timeMethod,this);
        timer.start();

    }

    private timeMethod(){
        console.log("途中");
        
    }
 

}