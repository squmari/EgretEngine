class CreatePhysicsBall extends egret.DisplayObjectContainer {

        /**
         * クラスに代入されて引数の受け取り用変数
         */
        private dx : number;
        private dy : number;
        private world;

        public constructor(dx: number, dy : number, world) {
        super();
        this.dx = dx;
        this.dy = dy;
        this.world = world;
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }



    /**
     * 変数
     */
    private time : number = 0;//繰り返しメソッド用のタイマー
 

    private addToStage() {

        //物理挙動をもつコライダーの生成
        const body : p2.Body = new p2.Body({mass:1, position:[30 + this.dx,-100-this.dx*10], fixedRotation:true});
        const bodyShape = new p2.Circle({ radius: 5 });
        body.addShape(bodyShape);
        this.world.addBody(body);

        //ループ処理
        this.addEventListener(egret.Event.ENTER_FRAME,drawBall,this);


        //図形の表示用オブジェクトのインスタンス化
        const shape:egret.Shape = new egret.Shape();
        this.addChild(shape);

        //ボールの描画
        function drawBall(dt: number){

            //一旦ステージに描画した図形を消す。これがないとすごく重たくなる。
            shape.graphics.clear();
            //bodyを自然落下
            this.world.step(1/60, dt/1000, 10);

            shape.x = body.position[0];
            shape.y = body.position[1];
            
            shape.graphics.beginFill(0xffd700);
            shape.graphics.drawCircle(0, 0, 5);
            shape.graphics.endFill();
            return false;

        }
        
    }

}