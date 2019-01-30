class Main extends egret.DisplayObjectContainer {

        public constructor() {
        super();
        
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }

    /**
     * 変数の追加
     */
    private time :number = 0 ;

    private addToStage() {

        this.time = egret.getTimer();
        egret.startTick(this.timeMethod,this);


    }

    private timeMethod() : boolean{
        this.time += 1;
        console.log(this.time);
        if(this.time >=1000){
            egret.stopTick(this.timeMethod,this);
            console.log("終了");
        }
        return false;
    }


}