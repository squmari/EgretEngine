class Main extends egret.DisplayObjectContainer {

        public constructor() {
        super();
        
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }


    private addToStage() {

        this.addEventListener(egret.Event.ENTER_FRAME,this.timeMethod,this);

    }

    private timeMethod() : void {
        
      console.log("連続");
      
    }


}