import { _decorator, Component, Sprite } from 'cc';
import { GameDate } from './GameData';
const { ccclass, property } = _decorator;

@ccclass('scr_gameStart')
export class scr_gameStart extends Component {

    /** 图片-场景 */
    @property({ type: Sprite })
    public spr_sceneImage:Sprite = null;
    

    start() {
        let sceneIndex = GameDate.getData().scene_index;
        this.changeScene(sceneIndex);
    }

    update(deltaTime: number) {
        
    }


    //切换场景
    changeScene(sceneName:string){
        let mapUrl = "images/scene/" + sceneName + "/spriteFrame";
        GameDate.getData().loadSprite(this.spr_sceneImage,mapUrl);
    }
}


