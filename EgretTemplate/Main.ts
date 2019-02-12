class Main extends eui.UILayer {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 
    private addToStage() {
        GameObject.initial( this.stage );
        Game.init();
        egret.startTick(this.tickLoop, this);
    }

    tickLoop(timeStamp:number):boolean{
        GameObject.update();
        return false;
    }
}

class Game{

    public static height: number;
    public static width: number;

    static init() {
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width  = egret.MainContext.instance.stage.stageWidth;
        
        /* new メソッドを記入*/
    }


}

abstract class GameObject {
    
    public shape:egret.Shape = null;
    private static objects: GameObject[];
    public static display: egret.DisplayObjectContainer;
    //public static transit:()=>void;

    constructor() {
        GameObject.objects.push(this);
    }


    static initial(displayObjectContainer: egret.DisplayObjectContainer){
        GameObject.objects = [];
        GameObject.display = displayObjectContainer;
    }

    abstract updateContent() : void;

    static update(){

    }

}

