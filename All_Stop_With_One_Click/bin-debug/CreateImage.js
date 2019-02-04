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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var CreateImage = (function (_super) {
    __extends(CreateImage, _super);
    function CreateImage() {
        var _this = _super.call(this) || this;
        _this.egretMoveFlag = false; //trueで移動可能
        _this.once(egret.Event.ADDED_TO_STAGE, _this.generateEgretImage, _this);
        return _this;
    }
    /**
     * リソース読み込み準備
     * default.res.jsonから画像データを取得する為のRES設定を行う
    */
    CreateImage.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload")];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 引数のnameからBitmapデータを取得する。name属性の参考：resources/resource.json
     */
    CreateImage.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 画像の生成
     */
    CreateImage.prototype.generateEgretImage = function (event) {
        // 画像の生成
        this.egretImage = this.createBitmapByName("egret_icon_png");
        this.egretMoveFlag = true;
        //Enable touchEvent
        this.egretImage.touchEnabled = true;
        //this.egretImage.pixelHitTest = true;
        this.addChild(this.egretImage);
        this.egretImage.x = 100;
        this.egretImage.y = 100 + Math.floor(Math.random() * 300);
        //画面にタッチした瞬間にtouchMethodを実行
        this.egretImage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.egretTouch, this);
        egret.startTick(this.moveEgret, this);
    };
    /**
     * 画像を移動させる
     */
    CreateImage.prototype.moveEgret = function () {
        if (this.egretMoveFlag == true) {
            this.egretImage.x += 1;
            this.egretImage.y += 0;
        }
        return false;
    };
    /**
     * 画像の動きを止める
     */
    CreateImage.prototype.moveStop = function () {
        this.egretMoveFlag = false;
        this.egretImage.touchEnabled = false;
        return false;
    };
    /**
     * タッチイベント
     * TouchEvent
     */
    CreateImage.prototype.egretTouch = function (evt) {
        this.moveStop();
    };
    return CreateImage;
}(egret.DisplayObjectContainer));
__reflect(CreateImage.prototype, "CreateImage");
//# sourceMappingURL=CreateImage.js.map