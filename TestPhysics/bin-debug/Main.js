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
var GraphicShape;
(function (GraphicShape) {
    GraphicShape[GraphicShape["NONE"] = Math.pow(2, 0)] = "NONE";
    GraphicShape[GraphicShape["CIECLE"] = Math.pow(2, 1)] = "CIECLE";
    GraphicShape[GraphicShape["BOX"] = Math.pow(2, 2)] = "BOX";
})(GraphicShape || (GraphicShape = {}));
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        return _this;
    }
    Main.prototype.addToStage = function () {
        GameObject.initial(this.stage);
        CreateGameScene.init();
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var CreateGameScene = (function () {
    function CreateGameScene() {
    }
    CreateGameScene.init = function () {
        this.width = egret.MainContext.instance.stage.stageWidth;
        this.height = egret.MainContext.instance.stage.stageHeight;
        new CreatePhysicsWorld();
        new Ball(CreateGameScene.width / 2, 0, 20);
        new Box(CreateGameScene.width / 2, 500, 100, 30, 10);
        new Box(CreateGameScene.width / 2, 800, 100, 30, 10);
        egret.startTick(this.tickLoop, this);
    };
    CreateGameScene.tickLoop = function (timeStamp) {
        if (timeStamp === void 0) { timeStamp = Main.timeStamp; }
        GameObject.update();
        CreatePhysicsWorld.worldBegin(timeStamp);
        return false;
    };
    return CreateGameScene;
}());
__reflect(CreateGameScene.prototype, "CreateGameScene");
var GameObject = (function () {
    function GameObject() {
        this.shape = null;
        this.body = null;
        this.bodyShape = null;
        this.world = null;
        GameObject.objects.push(this);
    }
    GameObject.initial = function (mainStage) {
        GameObject.objects = [];
        GameObject.display = mainStage;
    };
    GameObject.update = function () {
        GameObject.objects.forEach(function (obj) { return obj.updateContent(); });
    };
    return GameObject;
}());
__reflect(GameObject.prototype, "GameObject");
var CreatePhysicsWorld = (function (_super) {
    __extends(CreatePhysicsWorld, _super);
    function CreatePhysicsWorld() {
        var _this = _super.call(this) || this;
        _this.createWorld();
        return _this;
    }
    CreatePhysicsWorld.prototype.createWorld = function () {
        CreatePhysicsWorld.world = new p2.World();
        CreatePhysicsWorld.world.sleepMode = p2.World.BODY_SLEEPING;
        CreatePhysicsWorld.world.gravity = [0, 9.8];
    };
    CreatePhysicsWorld.prototype.updateContent = function () {
    };
    CreatePhysicsWorld.worldBegin = function (dt) {
        CreatePhysicsWorld.world.step(1 / 60, dt / 1000, 10);
        return false;
    };
    CreatePhysicsWorld.world = null;
    return CreatePhysicsWorld;
}(GameObject));
__reflect(CreatePhysicsWorld.prototype, "CreatePhysicsWorld");
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(x, y, radius) {
        var _this = _super.call(this) || this;
        Ball.I = _this;
        _this.setBody(x, y, radius);
        _this.setShape(radius);
        return _this;
    }
    Ball.prototype.setBody = function (x, y, radius) {
        Ball.I = this;
        this.body = new p2.Body({ mass: 1, position: [x, y] });
        this.bodyShape = new p2.Circle({
            radius: radius, collisionGroup: GraphicShape.CIECLE, collisionMask: GraphicShape.BOX, fixedRotation: true
        });
        this.body.addShape(this.bodyShape);
        CreatePhysicsWorld.world.addBody(this.body);
    };
    Ball.prototype.setShape = function (radius) {
        this.shape = new egret.Shape();
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        this.shape.graphics.beginFill(0xff0000);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    };
    Ball.prototype.updateDrowShape = function () {
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        GameObject.display.addChild(this.shape);
    };
    Ball.prototype.updateContent = function () {
        this.updateDrowShape();
        console.log("this.body.position[1]");
    };
    Ball.I = null;
    return Ball;
}(GameObject));
__reflect(Ball.prototype, "Ball");
var Box = (function (_super) {
    __extends(Box, _super);
    function Box(x, y, boxWidth, boxHeight, hp) {
        var _this = _super.call(this) || this;
        _this.hp = null;
        _this.hPText = null;
        _this.hp = hp;
        _this.setBody(x, y, boxWidth, boxHeight);
        _this.setShape(boxWidth, boxHeight);
        _this.hPText = new MyText(x, y, hp.toString(), 100, 0.5, 0xFFFFFF, "Meiryo", 0x000000, 0);
        CreatePhysicsWorld.world.on("beginContact", _this.collision, _this);
        return _this;
    }
    Box.prototype.setBody = function (x, y, width, height) {
        this.body = new p2.Body({ mass: 1, position: [x, y], type: p2.Body.STATIC });
        this.bodyShape = new p2.Box({
            width: width, height: height, collisionGroup: GraphicShape.BOX, collisionMask: GraphicShape.CIECLE, fixedRotation: true
        });
        this.body.addShape(this.bodyShape);
        CreatePhysicsWorld.world.addBody(this.body);
    };
    Box.prototype.setShape = function (width, height) {
        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width / 2; //p2とEgretは座標軸とアンカー位置が違うので調整
        this.shape.anchorOffsetY += height / 2;
        this.shape.x = this.body.position[0] /*+ width*/;
        this.shape.y = this.body.position[1] /*- height/2*/;
        this.shape.graphics.beginFill(0xff0000);
        this.shape.graphics.drawRect(0, 0, width, height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    };
    Box.prototype.setHpText = function (x, y, text, size, ratio, color, font, stColor, stSize) {
        new MyText(x, y, text, 100, 0.5, 0xFFFFFF, "Meiryo", 0x000000, 0);
    };
    Box.prototype.updateContent = function () {
    };
    Box.prototype.collision = function (evt) {
        var bodyA = evt.bodyA;
        var shapeA = evt.shapeA;
        Ball.I.body.applyForce([0, -10000], [0, 0]);
        this.hp -= 1;
        this.hPText.updateText(this.hp.toString());
    };
    return Box;
}(GameObject));
__reflect(Box.prototype, "Box");
var MyText = (function (_super) {
    __extends(MyText, _super);
    function MyText(x, y, text, size, ratio, color, font, stColor, stSize) {
        var _this = _super.call(this) || this;
        _this.myTextField = null;
        _this.myText = null;
        _this.x = 0;
        _this.y = 0;
        _this.size = 1;
        _this.ratio = 1;
        _this.color = 0x000000;
        _this.stColor = 0x0000000;
        _this.stSize = 0;
        _this.font = "Meiryo";
        _this.text = "";
        _this.newText(x, y, text, size, ratio, color, font, stColor, stSize);
        _this.x = x;
        _this.y = y;
        _this.text = text;
        _this.size = size;
        _this.ratio = ratio;
        _this.color = color;
        _this.font = font;
        _this.stColor = stColor;
        _this.stSize = stSize;
        return _this;
    }
    MyText.prototype.newText = function (x, y, text, size, ratio, color, font, stColor, stSize) {
        this.myTextField = new egret.TextField();
        this.myTextField.x = x || 0;
        this.myTextField.y = y || 0;
        this.myTextField.scaleX = ratio || 1;
        this.myTextField.scaleY = ratio || 1;
        this.myTextField.textFlow = [
            { text: text,
                style: {
                    "textColor": color || 0x000000, "size": size || 1, "fontFamily": font || "Meiryo", "strokeColor": stColor || 0x000000, "stroke": stSize || 0,
                }
            }
        ];
        GameObject.display.addChild(this.myTextField);
    };
    MyText.prototype.updateText = function (text) {
        this.myTextField.textFlow = [
            { text: text,
                style: {
                    "textColor": this.color || 0x000000, "size": this.size || 1, "fontFamily": this.font || "Meiryo", "strokeColor": this.stColor || 0x000000, "stroke": this.stSize || 0,
                }
            }
        ];
        GameObject.display.addChild(this.myTextField);
    };
    MyText.prototype.updateContent = function () {
    };
    return MyText;
}(GameObject));
__reflect(MyText.prototype, "MyText");
//# sourceMappingURL=Main.js.map