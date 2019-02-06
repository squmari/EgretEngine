class Main extends egret.DisplayObjectContainer {

        private createPhysicsBall :CreatePhysicsBall[] = [];
        private world : p2.World;
        private BallNumber : number = 1000;
 
        public constructor() {
        super();
        
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 

    private addToStage(event:egret.Event) {

        this.world = new p2.World();
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        this.world.gravity = [0, 9.8*50];

        //見えない壁や地面の生成
        for(let i = 0; i < 3; i++){
            const planeBody: p2.Body[] = [];
            planeBody[i] = new p2.Body({fixedRotation:true ,type:p2.Body.STATIC});
            const planeShape: p2.Plane[] = [];
            planeShape[i] = new p2.Plane();

            switch(i){
                //地面
                case 0:
                    planeBody[i].position=  [0, 700];
                    planeBody[i].angle = Math.PI;//rad表記
                break;

                //右の壁
                case 1:
                    planeBody[i].position=  [1260, 700];
                    planeBody[i].angle = Math.PI/2;//rad表記
                break;

                //左の壁
                case 2:
                    planeBody[i].position=  [20, 700];
                    planeBody[i].angle = 3* Math.PI/2;//rad表記
                break;

            }

            planeBody[i].addShape(planeShape[i]);
            this.world.addBody(planeBody[i]);
        }


        for(let i = 0; i < this.BallNumber; i++){
            this.createPhysicsBall[i] = new CreatePhysicsBall(this.world, i , i);
            this.createPhysicsBall[i].drawBall();
            this.addChild(this.createPhysicsBall[i]);
        }

        //ループ処理
        this.addEventListener(egret.Event.ENTER_FRAME,this.worldBigin,this);


    }

    private worldBigin(dt: number): Boolean{
        //bodyを自然落下
        this.world.step(1/60, dt/1000, 10);
        //console.log(this.body.position[1]);
        for(let i = 0; i < this.BallNumber; i++){
            this.createPhysicsBall[i].moveBall();        
        }
        return false;
        
    }


}