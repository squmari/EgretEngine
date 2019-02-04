　class CreateImage extends  egret.DisplayObjectContainer {

    /**
     * 画像のプロパティ
     */
    private egretImage : egret.Bitmap;
    private egretMoveFlag : boolean = false;//trueで移動可能


        public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.generateEgretImage, this);
    }


    /** 
     * リソース読み込み準備
     * default.res.jsonから画像データを取得する為のRES設定を行う
    */
    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload");
        }
        catch (e) {
            console.error(e);
        }
    }

    /**
     * 引数のnameからBitmapデータを取得する。name属性の参考：resources/resource.json
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    
    /**
     * 画像の生成
     */
    public generateEgretImage(event:egret.Event): void {

        // 画像の生成
        this.egretImage = this.createBitmapByName("egret_icon_png");
        this.egretMoveFlag = true;

        //Enable touchEvent
        this.egretImage.touchEnabled =true;
        //this.egretImage.pixelHitTest = true;
        this.addChild(this.egretImage);

        this.egretImage.x = 100;
        this.egretImage.y = 100 + Math.floor( Math.random() * 300 );

        //画面にタッチした瞬間にtouchMethodを実行
        this.egretImage.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.egretTouch, this );

        egret.startTick(this.moveEgret, this);
    }


    /**
     * 画像を移動させる
     */
    private moveEgret() : boolean{

        if(this.egretMoveFlag == true){

            this.egretImage.x += 1;
            this.egretImage.y += 0;

        }

        return false;
    }

    /**
     * 画像の動きを止める
     */
    private moveStop() : boolean{

        this.egretMoveFlag = false;
        this.egretImage.touchEnabled = false;
        return false;
    }

    /**
     * タッチイベント
     * TouchEvent
     */
    private egretTouch(evt:egret.TouchEvent){

        this.moveStop();
                
    }





}

