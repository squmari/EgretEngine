var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.createPhysicsBall = [];
        _this.BallNumber = 1000;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        return _this;
    }
    Main.prototype.addToStage = function (event) {
        this.world = new p2.World();
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        this.world.gravity = [0, 9.8 * 50];
        //見えない壁や地面の生成
        for (var i = 0; i < 3; i++) {
            var planeBody = [];
            planeBody[i] = new p2.Body({ fixedRotation: true, type: p2.Body.STATIC });
            var planeShape = [];
            planeShape[i] = new p2.Plane();
            switch (i) {
                //地面
                case 0:
                    planeBody[i].position = [0, 700];
                    planeBody[i].angle = Math.PI; //rad表記
                    break;
                //右の壁
                case 1:
                    planeBody[i].position = [1260, 700];
                    planeBody[i].angle = Math.PI / 2; //rad表記
                    break;
                //左の壁
                case 2:
                    planeBody[i].position = [20, 700];
                    planeBody[i].angle = 3 * Math.PI / 2; //rad表記
                    break;
            }
            planeBody[i].addShape(planeShape[i]);
            this.world.addBody(planeBody[i]);
        }
        for (var i = 0; i < this.BallNumber; i++) {
            this.createPhysicsBall[i] = new CreatePhysicsBall(this.world, i, i);
            this.createPhysicsBall[i].drawBall();
            this.addChild(this.createPhysicsBall[i]);
        }
        //ループ処理
        this.addEventListener(egret.Event.ENTER_FRAME, this.worldBigin, this);
    };
    Main.prototype.worldBigin = function (dt) {
        //bodyを自然落下
        this.world.step(1 / 60, dt / 1000, 10);
        //console.log(this.body.position[1]);
        for (var i = 0; i < this.BallNumber; i++) {
            this.createPhysicsBall[i].moveBall();
        }
        return false;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map