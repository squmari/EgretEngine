class CreatePhysicsBall extends egret.DisplayObjectContainer {

        /**
         * クラスに代入されて引数の受け取り用変数
         */
        protected dx : number = 1;
        protected dy : number = 1;
        protected world;
        protected ballPositionX : number = 30;
        protected ballPositionY : number = 100;

    public constructor(world : p2.World, dx :number, dy :number) {
        super();

        this.world = world;
        this.dx = dx;
        this.dy = dy;
        //this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }


    //図形の表示用オブジェクトのインスタンス化
    private shape:egret.Shape;
    //物理挙動をもつコライダーの生成
    private body : p2.Body;
    private bodyShape : p2.Circle;

    public worldBigin(dt: number): Boolean{
        //bodyを自然落下
        this.world.step(1/60, dt/1000, 10);
        //console.log(this.body.position[1]);
        this.moveBall();        
        return false;

    }

    //ボールの描画
    public drawBall() {
        this.shape = new egret.Shape();
        this.addChild(this.shape);
        this.body = new p2.Body({mass:1, position:[this.ballPositionX + this.dx,+ this.ballPositionY - this.dx * 10], fixedRotation:true});
        this.bodyShape = new p2.Circle({ radius: 5 });
        this.body.addShape(this.bodyShape);
        this.world.addBody(this.body);


        //bodyを自然落下
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        
        this.shape.graphics.beginFill(0xffd700);
        this.shape.graphics.drawCircle(0, 0, 5);
        this.shape.graphics.endFill();

    }

    public moveBall(){
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        this.addChild(this.shape);

    }

}

