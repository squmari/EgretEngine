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
var CreatePhysicsBall = (function (_super) {
    __extends(CreatePhysicsBall, _super);
    function CreatePhysicsBall(world, dx, dy) {
        var _this = _super.call(this) || this;
        /**
         * クラスに代入されて引数の受け取り用変数
         */
        _this.dx = 1;
        _this.dy = 1;
        _this.ballPositionX = 30;
        _this.ballPositionY = 100;
        _this.world = world;
        _this.dx = dx;
        _this.dy = dy;
        return _this;
        //this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
    CreatePhysicsBall.prototype.worldBigin = function (dt) {
        //bodyを自然落下
        this.world.step(1 / 60, dt / 1000, 10);
        //console.log(this.body.position[1]);
        this.moveBall();
        return false;
    };
    //ボールの描画
    CreatePhysicsBall.prototype.drawBall = function () {
        this.shape = new egret.Shape();
        this.addChild(this.shape);
        this.body = new p2.Body({ mass: 1, position: [this.ballPositionX + this.dx, +this.ballPositionY - this.dx * 10], fixedRotation: true });
        this.bodyShape = new p2.Circle({ radius: 5 });
        this.body.addShape(this.bodyShape);
        this.world.addBody(this.body);
        //bodyを自然落下
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        this.shape.graphics.beginFill(0xffd700);
        this.shape.graphics.drawCircle(0, 0, 5);
        this.shape.graphics.endFill();
    };
    CreatePhysicsBall.prototype.moveBall = function () {
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        this.addChild(this.shape);
    };
    return CreatePhysicsBall;
}(egret.DisplayObjectContainer));
__reflect(CreatePhysicsBall.prototype, "CreatePhysicsBall");
//# sourceMappingURL=CreatePhysicsBall.js.map