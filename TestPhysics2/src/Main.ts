enum GraphicShape{
    NONE = Math.pow(2,0),
    CIECLE = Math.pow(2,1),
    BOX = Math.pow(2,2),
}
class Main extends eui.UILayer {

    static timeStamp : number;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 
    private addToStage() {
        GameObject.initial( this.stage );
        CreateGameScene.init();
       
    }


    
}

class CreateGameScene{

    static width : number;
    static height: number;
    static init() {
        this.width  = egret.MainContext.instance.stage.stageWidth;
        this.height = egret.MainContext.instance.stage.stageHeight;

        new CreatePhysicsWorld();
        new Ball(CreateGameScene.width/2, 0, 20);

//------------------------------------------------------------
//Boxを２つインスタンス化すると、1つ目のBoxにボールが当たっても、2つ目のBoxのHPが減る

        new Box(CreateGameScene.width/2, 500, 100, 30, 10);
        new Box(CreateGameScene.width/2, 800, 100, 30, 10);

//---------------------------------------------------------------
        egret.startTick(this.tickLoop, this);

    }
        
    static tickLoop(timeStamp:number = Main.timeStamp):boolean{
        GameObject.update();
        PhysicsObject.physicsUpdate(timeStamp);       
        return false;
    }


}

abstract class GameObject {
    

    
    static objects: GameObject[];
    static display: egret.DisplayObjectContainer;

    constructor() {
        GameObject.objects.push(this);
    }


    static initial(mainStage: egret.DisplayObjectContainer){
        GameObject.objects = [];
        GameObject.display = mainStage;
    }

    abstract updateContent() : void;

    static update(){
        GameObject.objects.forEach(obj => obj.updateContent());
    }

}

abstract class PhysicsObject extends GameObject{
    static physicsObjects : PhysicsObject[];
    protected shape:egret.Shape = null;
    public body : p2.Body = null;
    protected bodyShape : p2.Circle | p2.Box = null;
    //protected world : p2.World = null;

    constructor() {
        super();
        this.init();
        PhysicsObject.physicsObjects.push(this);
        CreatePhysicsWorld.world.on("beginContact",  this.collision, this);
    }

    protected init(){
        PhysicsObject.physicsObjects = [];
    }

    abstract collision(evt : any) : void;

    static physicsUpdate(dt : number) :boolean{
        PhysicsObject.physicsObjects.forEach(obj => obj.collision);
       
        CreatePhysicsWorld.world.step(1/60, dt/1000, 10);
        return false;
    }

}



class CreatePhysicsWorld extends GameObject{
    static world : p2.World = null;
    constructor(){
        super();
        this.createWorld();
    }

    createWorld(){
        CreatePhysicsWorld.world = new p2.World();
        CreatePhysicsWorld.world.sleepMode = p2.World.BODY_SLEEPING;
        CreatePhysicsWorld.world.gravity = [0, 9.8];

    }
    
    updateContent(){}




}

class Ball extends PhysicsObject{

    static I:Ball = null; 

    constructor(x: number, y:number, radius: number){
        super();

        Ball.I = this;
        this.setBody(x, y, radius);
        this.setShape(radius);
    }

    setBody(x: number, y:number, radius: number){
        Ball.I =this;
        this.body = new p2.Body({mass : 1, position:[x,y]});
        this.bodyShape = new p2.Circle({
            radius : radius, collisionGroup: GraphicShape.CIECLE, collisionMask:GraphicShape.BOX , fixedRotation:true
        });
        this.body.addShape(this.bodyShape);
        CreatePhysicsWorld.world.addBody(this.body);
        
    }

    setShape(radius: number){
        this.shape = new egret.Shape();
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        this.shape.graphics.beginFill(0xff0000);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }

    updateDrowShape(){
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        GameObject.display.addChild(this.shape);
    }


    updateContent(){
        this.updateDrowShape();       
        
    }

    collision(evt:any){

    }


}

class Box extends PhysicsObject{

    private hp :number = null;
    private hPText : MyText = null;

    constructor(x: number, y:number, boxWidth: number, boxHeight: number, hp : number){
        super();
        this.hp = hp;
        this.setBody(x, y, boxWidth, boxHeight);
        this.setShape(boxWidth, boxHeight);
        this.hPText = new MyText(x,y, hp.toString() ,100, 0.5,0xFFFFFF,"Meiryo",0x000000, 0);
        //CreatePhysicsWorld.world.on("beginContact",  this.collision, this);
    }

    setBody(x: number, y:number, width: number, height : number){

        this.body = new p2.Body({mass : 1, position:[x,y], type:p2.Body.STATIC});
        this.bodyShape = new p2.Box({
            width : width, height : height,collisionGroup: GraphicShape.BOX, collisionMask:GraphicShape.CIECLE, fixedRotation:true
        });

        this.body.addShape(this.bodyShape);
        CreatePhysicsWorld.world.addBody(this.body);
        
    }

    setShape(width: number, height : number){

        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width/2;//p2とEgretは座標軸とアンカー位置が違うので調整
        this.shape.anchorOffsetY += height/2;
        this.shape.x = this.body.position[0] /*+ width*/;
        this.shape.y = this.body.position[1] /*- height/2*/;
        this.shape.graphics.beginFill(0xff0000);
        this.shape.graphics.drawRect(0, 0, width , height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }

    setHpText(x:number, y:number, text:string, size:number, ratio:number, color:number, font:string, stColor:number, stSize:number){
        new MyText(x,y,text,100, 0.5,0xFFFFFF,"Meiryo",0x000000, 0);
    }

    updateContent(){

    }

    collision(evt){
        const bodyA: p2.Body = evt.bodyA;
        const shapeA  = evt.shapeA;

        Ball.I.body.applyForce([0,-10000],[0,0]);

        this.hp -= 1;
        this.hPText.updateText(this.hp.toString());
    }



}

class MyText extends GameObject{
    public myTextField : egret.TextField | null = null;
    public myText : string | null = null;

    public x : number|null = 0;
    public y : number|null = 0;
    public size : number|null = 1;
    public ratio : number|null = 1;
    public color : number|null = 0x000000;
    public stColor : number|null =0x0000000;
    public stSize : number|null = 0;
    public font : string|null = "Meiryo";
    public text : string|null = "";

    public constructor(x:number, y:number, text:string, size:number, ratio:number, color:number, font:string, stColor:number, stSize:number){
        super();
        this.newText(x, y, text, size, ratio, color, font, stColor, stSize);
        this.x = x;
        this.y = y;
        this.text = text;
        this.size = size;
        this.ratio = ratio;
        this.color= color;
        this.font = font;
        this.stColor = stColor;
        this.stSize = stSize;
    }

    protected newText(x:number, y:number, text:string, size:number, ratio:number, color:number, font:string, stColor:number, stSize:number): void {
        
        this.myTextField = new egret.TextField();
        this.myTextField.x = x || 0;
        this.myTextField.y = y || 0;

        this.myTextField.scaleX = ratio || 1;
        this.myTextField.scaleY = ratio || 1;
        this.myTextField.textFlow = <Array<egret.ITextElement>>[ 
            {text: text, 
                style: {
                    "textColor": color || 0x000000, "size": size ||1, "fontFamily": font ||"Meiryo", "strokeColor": stColor || 0x000000, "stroke": stSize || 0,
                }
            }
        ];    
        GameObject.display.addChild(this.myTextField);

    }

    public updateText(text:string): void{

        this.myTextField.textFlow = <Array<egret.ITextElement>>[ 
            {text: text, 
                style: {
                    "textColor": this.color || 0x000000, "size": this.size ||1, "fontFamily": this.font ||"Meiryo", "strokeColor": this.stColor || 0x000000, "stroke": this.stSize || 0,
                }
            }
        ];    
        GameObject.display.addChild(this.myTextField);
    }

    
    updateContent(){

    }



}
